//
//  Pablozg basado en la versión de LuisPa para movistar
//
//  Este program se queda en el background com daemon para
//  hacer una petición diaria al servidor de El Pais
//  para bajarse el EPG. Además, al arrancar, crea los
//  ficheros /tmp/tvHOME.m3u y /tmp/tvREMOTE.m3u
//
'use strict';

// Imports
import Utils from './utils';
import CadenasHOME from './cadenasHOME';
import CadenasHOME_din from './cadenasHOME_din';

import fs from 'fs';
import rp from 'request-promise';
import path from 'path';


// Timers
let timerConversion = undefined;
let timerSessionController = undefined;

// =========================================================
// Constantes
// =========================================================
let progPreferences = {

	// CADENAS:
	//
	// Variable que apunta al array de cadenas (canales) que voy a
	// usar para los clientes que se conecten por la LAN casera.
	cadenasHOME: CadenasHOME,
	// Canales dinámicos que sobreescriben la fuente en el fichero m3u,
	// permite añadir canales de forma dinámica pero sin tocar los
	// originales.
	cadenasHOME_din: CadenasHOME_din,

	// Variable que apunta al array de cadenas SD que voy a usar
	// en los dispositivos Wifi para consumir menos ancho de banda.
	//cadenasREMOTE: CadenasREMOTE,
	// Canales dinámicos que sobreescriben la fuente en el fichero m3u
	//cadenasREMOTE_din: CadenasREMOTE_din,


	// M3U:
	//
	// Nombre del fichero de salida donde dejaré la lista de canales IPTV de cadenasHOME.js
	ficheroM3U_HOME: '/home/hts/guia/tvelpais.m3u',
	// Nombre del fichero de salida donde dejaré la lista de canales IPTV de cadenasREMOTE.js
	//ficheroM3U_REMOTE: '/tmp/tvREMOTE.m3u',

	// Durante la creación del fichero ficheroM3U_HOME se pone la URL del canal, pero como
	// tenemos dos opciones (UDP o TCP) a continuación debes modificar la siguiente
	// variable para adecuarlo a tu caso concreto.
	//
	// Este prefijo se pondrá delante del valor de "elpais_fuente"" que
	// encuentras en el fichero src/cadenas*.js...
	//
	// Ejemplos con UDP y TCP:
	// uri_prefix: 'rtp://@'
	// uri_prefix: 'http://x.x.x.x:yyy/udp/'
	uri_prefix: 'udp://@',

	// Respecto a XMLTV, el objetivo es crear un fichero XMLTV compatible con
	// "http://xmltv.cvs.sourceforge.net/viewvc/xmltv/xmltv/xmltv.dtd"
	//
	// Ficheros XMLTV: En esta versión el proceso crea múltiples ficheros,
	// - Descargo el EPG que llega en formato XML "propio de elpais" y lo salvo en "guia.elpais-xml.xml"
	// - Lo convierto a JSON y lo salvo en guia.elpais-xml.json, es una copia del original en XML pero traducida "tal cual" a JSON.
	// - A continuación cambio las "key's" de este fichero a un JSON ya preparado para su traducción sencilla a XMLTV, lo dejo en guia.elpais-xmltv.json
	// - Por último hago el proceso contrario, traduzco de JSON a XMLTV y lo salvo en guia.elpais-xmltv.xml
	//
	// En resumen:   JSON(elpais)->JSON_UNIFICADO(elpais)->JSON(xmltv)->XML(xmltv)
	//
	// Ficheros temporales
	rutaFicheros : '/tmp',
	ficheroJsonINDEX: 'guia.elpais_',
	ficheroJSON: 'guia.elpais-xml.json',
	ficheroJSONTV: 'guia.elpais-xmltv.json',
	//
	// Fichero final:
	ficheroXMLTV: '/home/hts/guia/guiaelpais.xml',

	//
	// El programa ejecutará una descarga del EPG nada más arrancar y se quedará
	// en el background hasta una hora determinada del día siguiente.
	//
	// La hora se elegirá aleatoriamente entre los dos parámetros siguientes. En
	// el siguiente ejemplo estamos indicando que se elija una hora entre las
	// dos y las siete de la mañana. Si quieres afinar más, puedes poner el mismo
	// valor a ambas variables pero te recomiendo dejarlo así, es una forma
	// elegante de NO sobrecargar a los servidores de elpais.
	horaInicio: 9, //8
	horaFin: 10, // 10

	// Parámetros para hacer la solicitud a la Web de elpais:
	//
	// urlelpais: URI a donde haremos la petición.
	// dias: número de días de EPG que vamos a solicitar (Máximo 3)

	urlelpais: 'https://programacion-tv.elpais.com/data/',
	urlprogramas: 'https://programacion-tv.elpais.com/data/programas/',
	urlimagenes: 'https://programacion-tv.elpais.com/',
	dias: 3,

	// Gestión sobre cuando toca el siguiente ciclo de descarga.
	nextRunDate: 0,
	nextRunMilisegundos: 0,

	// Para mostrar métricas en el log.
	numChannels: 0,
	numProgrammes: 0,

	// Gestión interna, permite controlar que mientras que haya una conversión
	// en curso no se saldrá del programa.
	isConversionRunning: false,

	indiceJSON: null,

	datosProgramas: null,

	jsontv: null,

	i: 0,

	j: 0,

	// Modo desarrollador (asume que ya se ha descargado el EPG),
	developerMode: false, // Cambiar a 'false' en producción.

}


// =========================================================
// Funciones
// =========================================================
function comparaCadenasString(a,b) {
	if (a.elpais_numero < b.elpais_numero)
	return -1;
	if (a.elpais_numero > b.elpais_numero)
	return 1;
	return 0;
}

function comparaCadenasInteger(a,b) {
	let aNum=Number(a.elpais_numero);
	let bNum=Number(b.elpais_numero);

	if (aNum < bNum)
	return -1;
	if (aNum > bNum)
	return 1;
	return 0;
}

function creaFicheroM3U (cadenas, cadenas_din, ficheroM3U) {

	// Sobreescribo con los dinámicos
	cadenas_din.map(cadena_din => {
		let index = cadenas.findIndex(item => item.tvh_nombre === cadena_din.tvh_nombre);
		if ( index !== -1 ) {
			cadenas[index].tvh_fuente = cadena_din.tvh_fuente;
		}
	});
	// Genero el fichero .m3u (el encoding por defecto es utf8)
	var wstream = fs.createWriteStream(ficheroM3U);
	wstream.write('#EXTM3U\n');
	// añado los canales
	cadenas.map(cadena => {
		if ( cadena.tvh_m3u === true ) {
			wstream.write(`#EXTINF:-1 tvh-epg="disable" tvh-chnum="${cadena.elpais_numero}" tvh-tags="${cadena.tvh_tag}",${cadena.tvh_nombre}\n`);
			if ( cadena.tvh_fuente !== undefined ) {
				wstream.write(`${cadena.tvh_fuente}\n`);
			} else {
				wstream.write(`${progPreferences.uri_prefix}${cadena.elpais_fuente}\n`);
			}
		}
	});
	wstream.end();
}

function rmDir (dirPath, removeSelf) {
	if (removeSelf === undefined)
	removeSelf = true;
	try { var files = fs.readdirSync(dirPath); }
	catch(e) { return; }
	if (files.length > 0)
	for (var i = 0; i < files.length; i++) {
		//var filePath = dirPath + '/' + files[i];
		var filePath = path.join(dirPath, files[i]);
		if (filePath.indexOf("guia.elpais") !== -1) {
			if (fs.statSync(filePath).isFile())
			fs.unlinkSync(filePath);
			else
				rmDir(filePath);
			}
		}
		if (removeSelf)
		fs.rmdirSync(dirPath);
	};

	// =========================================================
	// Método principal
	// =========================================================

	function sessionController() {

		let generaM3u = false;

		// Paro mi propio timer, lo re-programaré más tarde
		clearInterval(timerSessionController);

		progPreferences.ficheroJsonINDEX = progPreferences.rutaFicheros + '/' + progPreferences.ficheroJsonINDEX;
		progPreferences.ficheroJSON = progPreferences.rutaFicheros + '/' + progPreferences.ficheroJSON;
		progPreferences.ficheroJSONTV = progPreferences.rutaFicheros + '/' + progPreferences.ficheroJSONTV;
		//progPreferences.ficheroXMLTV = progPreferences.rutaFicheros + '/' + progPreferences.ficheroXMLTV;

		if (!progPreferences.developerMode) rmDir(progPreferences.rutaFicheros, false);

		// Genero array con los canales a descargar
		let arrayCadenas = [];
		progPreferences.cadenasHOME.map(cadena => {
			if (cadena.elpais_epg) {
				arrayCadenas.push(cadena.elpais_id)
			}
			if (cadena.tvh_m3u){
				generaM3u = true;
			}
		});


		// M3U cadenasHOME :
		if (generaM3u){
			creaFicheroM3U(progPreferences.cadenasHOME, progPreferences.cadenasHOME_din, progPreferences.ficheroM3U_HOME);
		}

		// XMLTV:
		//
		// Calculo cuando tendré que hacer la proxima solicitud
		let ahora = new Date();
		progPreferences.dias = Utils.validaDias(progPreferences.dias);
		progPreferences.diasInicioFin = Utils.fechaInicioFin(progPreferences.dias);
		progPreferences.nextRunDate = Utils.horaAleatoriaTomorrow(progPreferences.horaInicio, progPreferences.horaFin);
		progPreferences.nextRunMilisegundos = progPreferences.nextRunDate - ahora;

		if (progPreferences.nextRunMilisegundos < 0) {
			progPreferences.nextRunMilisegundos += 86400000; // dentro de 24h si algo falla
		}

		// Inicio el proceso pidiendo el EPG a elpais
		console.log('--');
		console.log(`Inicio del ciclo de consulta del EPG`);
		console.log('---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ');
		if (progPreferences.developerMode === false) {
			console.log(`1 - Descargando el EPG en formato JSON desde El País`);
			console.log(`  => PORT ${progPreferences.urlelpais}`);
			console.log(`  => EPG Descargando información para ${progPreferences.dias} días`);

			let urls = [];
			let files = [];

			// Creo el array con la url y fichero de destino de los indices
			for (let i = 0; i < progPreferences.dias; i++) {
				urls.push(progPreferences.urlelpais + 'parrilla_' + Utils.nextDay(i) + '.json');
				files.push(progPreferences.ficheroJsonINDEX + Utils.nextDay(i) + '.json');
			}

			// Creo el array con la url y fichero de destino de los canales
			for (let i = 0; i < arrayCadenas.length; i++) {

				urls.push(progPreferences.urlprogramas + arrayCadenas[i] + '.json');
				files.push(progPreferences.ficheroJsonINDEX + arrayCadenas[i] + '.json');
			}

			//const promises = urls.map(url => rp(url));
			const promises = urls.map(url => rp({
				method: 'GET',
				uri: url,
				headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
					'Accept': 'application/json',
					'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=120',
					'Age': '0',
				'Connection': 'keep-alive'},
				json: false
			}));
			Promise.all(promises)
			.then((data) => {

				var promises = [];
				for (let i = 0; i < data.length; i++) {
					promises.push(Promise.resolve(
					new Promise(function(resolve, reject) {
						fs.writeFile(files[i], data[i], function(error){
							if (error) {
								console.log(`    => Error escribiendo el fichero ${files[i]}`);
								reject(error);
							}
							else {
								console.log(`    => El fichero ${files[i]} se ha salvado correctamente`);
								resolve();
							}
						});
					}
					)));
				}
				Promise.all(promises).then(function() {
					conversionCompletaDeEPGaXMLTV();
				});
			});
		} else {
			conversionCompletaDeEPGaXMLTV();
		}
	}

	// Postprocesa los datos descargados
	function conversionCompletaDeEPGaXMLTV() {
		progPreferences.isConversionRunning = true;

		console.log(`1 - Descargando el EPG en formato JSON desde El País - Completado`);

		// Convierto los datos del indice y los detalles de los programas en formato JSON (El Pais) a un único fichero JSON (xmltv)
		console.log(`2 - Convierte JSON (El País) a JSONTV`);
		Utils.convierteJSONaJSONTV(progPreferences);

		console.log(`4 - Salvando JSON unificado de El País ${progPreferences.ficheroJSON} - Completado`);
		console.log(`5 - Convirtiendo JSON (El Pais) a JSONTV - Completado`);

		console.log(`6 - Salvando JSONTV ${progPreferences.ficheroJSONTV}`);

		let datosJSONTV = progPreferences.jsontv;

		// Ordeno los canales y programas
		//
		//datosJSONTV.tv.channel.sort(function (a, b) {
		//	return a.$.id.localeCompare(b.$.id);
		//});
		//

		// Primero el listado de canales
		datosJSONTV.tv.channel.sort((a, b) => a.$.id.localeCompare(b.$.id));

		// Despues por canal y fecha
		datosJSONTV.tv.programme.sort((a, b) => a.$.channel.localeCompare(b.$.channel) || a.$.start.localeCompare(b.$.start));


		fs.writeFile(progPreferences.ficheroJSONTV, JSON.stringify(datosJSONTV, null, 2), function (error) {
			if (error) {
				progPreferences.isConversionRunning = false;
				console.log(`6 - Salvando JSONTV ${progPreferences.ficheroJSONTV} - Fallido`);
				reject(error);
			} else {
				console.log(`6 - Salvando JSONTV ${progPreferences.ficheroJSONTV} - Completado`);

				// Convierto los datos en formato JSONTV a XMLTV
				console.log(`7 - Convirtiendo JSONTV a XMLTV`);
				let datosXMLTV = Utils.convierteJSONTVaXMLTV(datosJSONTV);

				console.log(`7 - Convirtiendo JSONTV a XMLTV - Completado`);

				console.log(`8 - Salvando fichero XMLTV ${progPreferences.ficheroXMLTV}`);
				fs.writeFile(progPreferences.ficheroXMLTV, datosXMLTV, function (error) {
					if (error) {
						progPreferences.isConversionRunning = false;
						console.log(`8 - Salvando fichero XMLTV ${progPreferences.ficheroXMLTV} - Fallido`);
						reject(error);
					}
					console.log(`8 - Salvando fichero XMLTV ${progPreferences.ficheroXMLTV} - Completado`);
					console.log('');
					console.log(`Completado!! - ${progPreferences.numChannels} canales y ${progPreferences.numProgrammes} pases`);
					progPreferences.isConversionRunning = false;
				});
			}
		});
		// Comprobar si la conversión ha finalizado
		// Nota: Se ejecutará inmediatamente (10ms), es un truco
		// para ejecutarlo la primera vez de forma rápida y que él
		// se auto reprograme con el intervalo que desee.
		timerConversion = setInterval(function () {
			monitorConversion();
		}, 10);

	}

	// =========================================================
	// Monitoriza si la conversión ha finalizado
	// =========================================================
	function monitorConversion() {
		// Nada más entrar limpio mi timer, lo activaré después
		// si realmente me hace falta.
		clearInterval(timerConversion);

		// Verifico si sigue activa...
		if (progPreferences.isConversionRunning === false) {
			// Si la conversión termino (con error o correctamente)
			// programo que el session controller se ejecute cuando
			// le toca...
			//console.log(`Programo próxima descarga para el: ${JSON.stringify(progPreferences.nextRunDate.toString())} quedan ${Utils.convertirTiempo(progPreferences.nextRunMilisegundos)}`);
			/*timerSessionController = setInterval(function () {
			sessionController();
			}, progPreferences.nextRunMilisegundos);*/
		} else {
			// log
			// console.log(`Monitor: La conversión se está ejecutando`);
			// Me auto-reprogramo para verificar dentro de 500ms.
			timerConversion = setInterval(function () {
				monitorConversion();
			}, 500);
		}
	}

	// =========================================================
	// START...
	// =========================================================

	// Programo que se arranque el session controller
	// Nota: Se ejecutará inmediatamente (10ms), es un truco
	// para ejecutarlo la primera vez de forma rápida y que él
	// se auto reprograme con el intervalo que desee.
	//
	timerSessionController = setInterval(function () {
		sessionController();
	}, 10);

