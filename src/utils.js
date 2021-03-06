//
// pablozg, basado en el trabajo de LuisPa https://github.com/LuisPalacios/tvhstar
//
'use strict';

// Imports
import fs from 'fs';
import xml2js from 'xml2js'; // https://github.com/Leonidas-from-XIV/node-xml2js
import https from 'https';

// Herramientas varias
const utils = {
	fechaUrl: function (day) {
		let today = new Date();

		var nextDay = new Date(today);
		nextDay.setDate(today.getDate() + day);

		let YYYY = nextDay.getUTCFullYear();
		let MM = ('0' + (nextDay.getUTCMonth() + 1)).slice(-2);
		let DD = ('0' + nextDay.getUTCDate()).slice(-2);

		return `${DD}-${MM}-${YYYY}`;
	},
	nextDay: function (day) {
		let today = new Date();

		var nextDay = new Date(today);
		nextDay.setDate(today.getDate() + day);

		let YYYY = nextDay.getUTCFullYear();
		let MM = ('0' + (nextDay.getUTCMonth() + 1)).slice(-2);
		let DD = ('0' + nextDay.getUTCDate()).slice(-2);

		return `${DD}${MM}${YYYY}`;
	},

	// Gestión de la fecha
	fechaConFormato: function (d) {
		let YYYY = d.getFullYear();
		let m = d.getMonth() + 1;
		let MM = m.toLocaleString('es-ES', { minimumIntegerDigits: 2, useGrouping: false })
		let DD = d.getDate().toLocaleString('es-ES', { minimumIntegerDigits: 2, useGrouping: false })
		let fecha = `${YYYY}-${MM}-${DD}`;
		return fecha;
	},
	fechaInicioFin: function (dias) {
		let inicio = new Date();
		let fin = new Date();
		fin.setDate(inicio.getDate() + (dias - 1));
		return {
			fechaInicio: utils.fechaConFormato(inicio),
			fechaFin: utils.fechaConFormato(fin)
		}
	},

	// Validación del número de días
	validaDias: function (diasTentativos) {
		let dias = 3
		if (diasTentativos) {
			let numDias = Number(diasTentativos);
			if (Number.isInteger(numDias)) {
				if (numDias >= 1 && numDias <= 11) {
					dias = numDias
				}
			}
		}
		return dias;
	},

	// Generar una fecha aleatoria mañana
	horaAleatoriaTomorrow: function (horaInicio, horaFin) {
		let ahora = new Date();
		let tomorrow = new Date();
		tomorrow.setDate(ahora.getDate() + 1);
		var hour = horaInicio + Math.random() * (horaFin - horaInicio) | 0;
		tomorrow.setHours(hour);
		return tomorrow;
	},

	// Convierte milisegunos a formato 'h m s ms'
	convertirTiempo: function (milisegundos) {
		var milis = milisegundos % 1000;
		milisegundos = parseInt(milisegundos / 1000);
		var segs = milisegundos % 60;
		milisegundos = parseInt(milisegundos / 60);
		var mins = milisegundos % 60;
		milisegundos = parseInt(milisegundos / 60);
		var horas = milisegundos % 24;
		var out = "";
		if (horas && horas > 0) out += horas + ((horas === 1) ? "h" : "h") + " ";
		if (mins && mins > 0) out += mins + ((mins === 1) ? "m" : "m") + " ";
		if (segs && segs > 0) out += segs + ((segs === 1) ? "s" : "s") + " ";
		if (milis && milis > 0) out += milis + ((milis === 1) ? "ms" : "ms") + " ";
		return out.trim();
	},

	// Convierto el JSON desde formato elpais a un JSON que será válido para crear el XMLTV.
	//
	convierteJSONaJSONTV: function (progPreferences) {

		// Calcular el Timezone Offset, necesito añadirlo a las fechas
		// de start/stop para ser compatibles Tvheadend.
		let hrs = -(new Date().getTimezoneOffset() / 60)
		let sign = "";
		if (hrs < 0) { sign = '-'; }
		if (hrs > 0) { sign = '+'; }
		let offset = `${sign}${hrs.toLocaleString('es-ES', { minimumIntegerDigits: 2, useGrouping: false })}00`;

		// Empiezo a construir el Objeto JSON que tendrá un formato
		// tal que xml2js.Builder podrá convertirlo a XMLTV directamente...
		//let jsontv = {
		progPreferences.jsontv = {
			tv: {
				"$": {
					"generator-info-name": 'pablozg based on LuisPa\'s work',
				},
				channel: [],
				programme: []
			},
		}

		for (let dias = 0; dias < progPreferences.dias; dias ++) {

			let ficheroJsonINDEX = progPreferences.ficheroJsonINDEX + utils.nextDay(dias) + '.json';
			// Leemos el fichero indice en formato JSON
			console.log(`  => Leyendo el indice con fecha ${utils.fechaUrl(dias)}`);

			let buffer = null;
			buffer = fs.readFileSync(ficheroJsonINDEX, "utf8"); // Usar para localizar el error en el parser
			//buffer = fs.readFileSync(ficheroJsonINDEX);
			/*buffer = buffer.replace(/\\n/g, "\\n")
			.replace(/\\'/g, "\\'")
			.replace(/\\"/g, '\\"')
			.replace(/\\&/g, "\\&")
			.replace(/\\r/g, "\\r")
			.replace(/\\t/g, "\\t")
			.replace(/\\b/g, "\\b")
			.replace(/\\f/g, "\\f");

			// remove non-printable and other non-valid JSON chars
			buffer = buffer.replace(/[\u0000-\u0019]+/g,"");*/

			buffer = buffer.replace(/INCLUDEPICTURE (.*?) MERGEFORMAT/g,''); // Evita error Producido por INCLUDEPICTURE \"s:\prgr_asi\imat\logo_sub2.bmp\" * MERGEFORMAT
			buffer = buffer.replace(/CMND\:\\/g,'');

			if (buffer.length == 0) {
				console.log(`  => Leyendo el indice con fecha ${utils.fechaUrl(dias)} - Fallido`);
				return {};
			} else {
				console.log(`  => Leyendo el indice con fecha ${utils.fechaUrl(dias)} - Completado`);
				console.log('');
				console.log(`3 - Parsing el indice con fecha ${utils.fechaUrl(dias)}`);

				progPreferences.indiceJSON = null;
				progPreferences.indiceJSON = JSON.parse(buffer);

				if (progPreferences.indiceJSON.length <= 0) {
					console.log('=============================================')
					console.log('HE RECIBIDO UNA RESPUESTA VACIA !!!!!!!!!!!!!')
					console.log('=============================================')

					return {};

				} else {
					// Analizar cada pase
					for(progPreferences.i = 0; progPreferences.i < progPreferences.indiceJSON.length; progPreferences.i++) {

						// hora de construir de convertir a JSONTV.
						//
						//
						let elpais_id = progPreferences.indiceJSON[progPreferences.i].idCanal;
						let index = progPreferences.cadenasHOME.findIndex(item => item.elpais_id === elpais_id);
						if (index != -1 && progPreferences.cadenasHOME[index].elpais_epg == false) index = -1;

						// Compruebo que el canal se encuentra en la lista para ser procesado
						if (index !== -1) {

							// Leemos el fichero asociado al canal con los programas
							let buffer = null;
							//buffer = fs.readFileSync(progPreferences.ficheroJsonINDEX + elpais_id + '.json');
							buffer = fs.readFileSync(progPreferences.ficheroJsonINDEX + elpais_id + '.json', "utf8"); // Usar para localizar el error en el parser

							buffer = buffer.replace(/INCLUDEPICTURE (.*?) MERGEFORMAT/g,''); // Evita error Producido por INCLUDEPICTURE \"s:\prgr_asi\imat\logo_sub2.bmp\" * MERGEFORMAT
							buffer = buffer.replace(/CMND\:\\/g,'');

							if (buffer.length == 0) {
								console.log(`  => Leyendo la información del canal ${progPreferences.cadenasHOME[index].elpais_nombre} (${elpais_id}) - Fallido`);
								return{};
							}else{
								console.log(`  => Leyendo la información del canal ${progPreferences.cadenasHOME[index].elpais_nombre} (${elpais_id}) - Completado`);
								progPreferences.programasJSON = JSON.parse(buffer);

								let channel_id = progPreferences.cadenasHOME[index].tvh_id;
								let display_name = progPreferences.cadenasHOME[index].tvh_nombre;

								// A pelo, el lenguaje siempre será 'es'
								let langES = 'es';

								// Para las categorías
								let langEN = 'en';

								// SECCIÓN 'channel'
								// -------------------

								// En el fichero origen (EPG de elpais) los nombres de los
								// canales vienen dentro de cada 'pase', así que voy a ir
								// descubriéndolos de forma dinámica.
								let isCanalGuardado = progPreferences.jsontv.tv.channel.findIndex(item => item["$"].id === channel_id) !== -1 ? true : false;
								if (!isCanalGuardado) {
									let channel = {
										"$": {
											"id": channel_id
										},
										"display-name": [
										{
											"_": display_name,
											"$": {
												"lang": langES
											}
										}
										],
										"icon": [
										{
											"$": {
												"src": progPreferences.urlimagenes + 'imagenes/canales/' + elpais_id + '.jpg'
											}
										}
										]
									};
									progPreferences.jsontv.tv.channel.push(channel);
									progPreferences.numChannels = progPreferences.numChannels + 1;
								}

								// SECCIÓN 'programme'
								// -------------------
								for(progPreferences.j = 0; progPreferences.j < progPreferences.indiceJSON[progPreferences.i].programas.length; progPreferences.j++) {

									// Busco en programasJSON (contiene la informacion especifica del programa en el indice principal)
									let indexPrograma = progPreferences.programasJSON.findIndex(item => item.id_programa === progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].id_programa);

									// Convierto la fecha/hora del pase a formato objeto (Date) de modo que
									// pueda hacer operaciones de forma sencilla.
									let [year, month, day] = progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].iniDate.substr(0, 10).split("-");
									let [hours, minutes, seconds] = progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].iniDate.substr(11, 8).split(":");
									let programmeStartDateObject = new Date(year, month - 1, day, hours, minutes, seconds, 0);

									// Convierto la fecha para el campo 'date' : YYYYMMMDD
									let programme_date = '';
									if (indexPrograma !== -1 && progPreferences.programasJSON[indexPrograma].year && progPreferences.programasJSON[indexPrograma].year  !== ""){
										programme_date = progPreferences.programasJSON[indexPrograma].year;
									}else{
										programme_date = `${year}${month}${day}`;
									}

									// Convierto la hora para el campo 'start' : YYYYMMMDDHHMMSS00 ?TTTT
									let programme_start = `${year}${month}${day}${hours}${minutes}${seconds} ${offset}`;

									[year, month, day] = progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].endDate.substr(0, 10).split("-");
									[hours, minutes, seconds] = progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].endDate.substr(11, 8).split(":");
									let programmeStopDateObject = new Date(year, month - 1, day, hours, minutes, seconds, 0);

									// Convierto la hora para el campo 'start' : YYYYMMMDDHHMMSS00 ?TTTT
									let programme_stop = `${year}${month}${day}${hours}${minutes}${seconds} ${offset}`;

									// Convierto la Categoría a las soportadas por Tvheadend
									let categoria = '';
									let descripcion = '';
									let episodeDescriptionChannel = '';
									let descriptionChannel = '';

									let episodeDescriptionIndex = progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].description;
									if (episodeDescriptionIndex === 'sin descripción') episodeDescriptionIndex = '';
									if (episodeDescriptionIndex.length > 0) episodeDescriptionIndex = '[COLOR orange]Argumento: [/COLOR][CR]' + episodeDescriptionIndex;

									categoria = utils.getCategoriaSection(progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].idSection);

									if (indexPrograma !== -1 ) {

										episodeDescriptionChannel = progPreferences.programasJSON[indexPrograma].episode_description;
										descriptionChannel = progPreferences.programasJSON[indexPrograma].description;
										categoria = utils.getCategoriaByName(progPreferences.programasJSON[indexPrograma].txt_genre, progPreferences.programasJSON[indexPrograma].txt_subgenre);

										if (episodeDescriptionChannel.includes(descriptionChannel) === false){

											// Comparamos logitudes para descartar que sea el mismo texto
											if (episodeDescriptionIndex.includes(descriptionChannel) === false){
												episodeDescriptionIndex = episodeDescriptionIndex + '[CR][CR]' + descriptionChannel;
											}
										}

										if (episodeDescriptionChannel.length > 0){
											episodeDescriptionChannel = '[COLOR orange]Descripción : [/COLOR][CR]' + episodeDescriptionChannel;
										}
									}

									if (episodeDescriptionChannel.includes(progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].description) === false){
										descripcion = episodeDescriptionIndex + '[CR][CR]' + episodeDescriptionChannel;
									}else{
										descripcion = episodeDescriptionChannel;
									}


									// Preparo el titulo

									let titulo = progPreferences.indiceJSON[progPreferences.i].programas[progPreferences.j].title;

									titulo = titulo.replace(/([\/\t]+(?=[\/\t])|^\s+|\s+$)/g, '')
									//.replace(/;/g," : ")
									//.replace(".",":")
									//.replace(/-/g," - ")
									.replace(/(\/(?=[a-zA-Z0-9]))/g, '$1 ')
									.replace(/(\/(?![a-zA-Z0-9]))/g, ' $1')
									.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '')
									.replace(/([\-\t]+(?=[\-\t])|^\s+|\s+$)/g, '')
									.replace(/([\;\t]+(?=[\;\t])|^\s+|\s+$)/g, '')
									.replace(/ [eE]p [0-9]\d*/g,"")
									.replace(/ [eE]pisodio.[0-9]\d*/g,"")
									.replace(/ [eE]p[.][0-9]*.\d*/g,"")
									.replace(/ [tT][0-9]\d*/g,"")
									.replace(/ \([tT][0-9]\d*\)/g,"")
									.replace(/ \([tT]emp [0-9]\d*\)/g,"")
									.replace(/ \([tT]emp\. [0-9]\d*\)/g,"")
									.replace(/ \([tT]emp\.[0-9]\d*\)/g,"")
									.replace(/ [tT]emp [0-9]\d*/g,"")
									.replace(/ [tT]emp\. [0-9]\d*/g,"")
									.replace(/ [tT]emp\.[0-9]\d*/g,"")
									.replace(/ [tT]emporada [0-9]\d*/g,"")
									.replace(/ \([0-9]*\)/g,"")
									.replace(/ [0-9]\.(?![0-9])/g,"")
									.replace(/ [eE]pisode.[0-9]\d*/g,"")
									.replace(/ [sS] [0-9]\d*/g,"")
									.replace(/ [sS][0-9]\d*/g,"")
									.replace(/ [sS]eason [0-9]\d*/g,"")
									.replace(/\(VOS\)/g,"");

									let tituloClear = titulo;
									let subtitulo = '';
									let indexDosPuntosTitulo = titulo.indexOf(':');

									let lastIndexDosPuntosTitulo = titulo.lastIndexOf(':');
									if (lastIndexDosPuntosTitulo === -1 || titulo.lastIndexOf('.') > indexDosPuntosTitulo) lastIndexDosPuntosTitulo = titulo.lastIndexOf('.');
									//if (lastIndexDosPuntosTitulo === -1) lastIndexDosPuntosTitulo = titulo.lastIndexOf('.');
									if (lastIndexDosPuntosTitulo === titulo.length - 1) lastIndexDosPuntosTitulo = -1; // Validamos que el . no sea el final del titulo

									/*if (indexPrograma !== -1 && progPreferences.programasJSON[indexPrograma].episode_title == '') {

									// Buscamos la exitencia de ':'
									if (indexDosPuntosTitulo === -1) indexDosPuntosTitulo = titulo.indexOf('-');
									if (indexDosPuntosTitulo === -1) indexDosPuntosTitulo = titulo.length;

									titulo = titulo.substr(0, indexDosPuntosTitulo);
									}*/

									// Buscamos la exitencia de '-'
									if (indexDosPuntosTitulo === -1 && titulo.length > 6) indexDosPuntosTitulo = titulo.indexOf('-'); // Evita cortar títulos como 9-1-1
									if (indexDosPuntosTitulo === -1 || lastIndexDosPuntosTitulo === indexDosPuntosTitulo) indexDosPuntosTitulo = titulo.length;

									// Buscamos especificamente el titulo de 'Mundial de Fórmula 1'
									let tempTitulo = titulo.normalize('NFD')
									.replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
									.normalize()
									//.replace(/\W/g, ' ')
									.replace(/\¿/g,"")
									.replace(/\?/g,"")
									.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '')
									.toLowerCase();

									if (tempTitulo.indexOf('mundial de formula 1') !== -1) indexDosPuntosTitulo = 20;

									titulo = titulo.substr(0, indexDosPuntosTitulo);

									// Preparo el subtítulo
									if (indexPrograma !== -1 ) {
										subtitulo = progPreferences.programasJSON[indexPrograma].episode_title;
									}

									if (subtitulo == '' || subtitulo === "xenérico"){

										if (titulo.length < tituloClear.length){
											subtitulo = tituloClear.substr(indexDosPuntosTitulo + 1, tituloClear.length).trim();
										}else{
											subtitulo = tituloClear;
										}
									}

									// Componemos el sistema de Temporada / Episodio
									let season = ' ';
									let episode = ' ';
									let episodeNum = ' ';

									if (indexPrograma !== -1 ) {

										season = parseInt(progPreferences.programasJSON[indexPrograma].season) - 1;
										if (season === -1) season = ' ';

										if (progPreferences.programasJSON[indexPrograma].episode.startsWith(progPreferences.programasJSON[indexPrograma].season) &&
										progPreferences.programasJSON[indexPrograma].episode.length >= 3){

											episode = progPreferences.programasJSON[indexPrograma].episode.substr(progPreferences.programasJSON[indexPrograma].season.length, progPreferences.programasJSON[indexPrograma].episode.length);
											episode = parseInt(episode) - 1;
										}else{
											episode = parseInt(progPreferences.programasJSON[indexPrograma].episode) - 1;
										}
										if (episode === -1) episode = ' ';

										if (season !== ' ' || episode !== ' '){
											episodeNum = season.toString() + " . " + episode.toString() + " . 0/1";
											descripcion = '[/COLOR][CR][CR]' + descripcion;

											if (episode !== ' ') {episode++; descripcion = 'Episodio ' + episode.toString() + descripcion;}
											if (season !== ' ') {
												season++;
												if (episode !== ' '){
													descripcion = '[COLOR green]Temporada ' + season.toString() + ' - ' + descripcion;
												}else{
													descripcion = '[COLOR green]Temporada ' + season.toString() + descripcion;
												}
											}

										}else{
											// Buscamos la temporada en formato (TXXXX)
											let expresionTemporada = progPreferences.programasJSON[indexPrograma].title.match(/\([tT][0-9]\d*\)/g);

											if (expresionTemporada !== null) {
												episodeNum = subtitulo + ' ' + expresionTemporada;
											}else{
												episodeNum = subtitulo;
												if (progPreferences.programasJSON[indexPrograma].year !== "") episodeNum = episodeNum + ' (' + progPreferences.programasJSON[indexPrograma].year + ')';
											}

										}
									}else{
										episodeNum = subtitulo;
									}

									// --------------------------------------------------------------------------
									// Conversión al nuevo formato
									// --------------------------------------------------------------------------

									// Preparo el pase en el nuevo formato
									//
									let programme = {
										"$": {
											"start": `${programme_start}`,
											"stop": `${programme_stop}`,
											"channel": channel_id
										},
										"title": [
										{
											"_": titulo,
											"$": {
												"lang": langES
											}
										}
										],
										"sub-title": [
										{
											"_": subtitulo,
											"$": {
												"lang": langES
											}
										}
										],
										"desc": [
										{
											"_": descripcion,
											"$": {
												"lang": langES
											}
										}
										],
										"date": [
										{
											"_": `${programme_date}`
										}
										],
										"category": [
										{
											"_": categoria,
											"$": {
												"lang": langES
											}
										}
										]
									};

									// Añado el episodio en caso de estar definido
									if (season !== ' ' || episode !== ' '){
										programme['episode-num'] = [
										{
											"_": episodeNum,
											"$": {
												"system": "xmltv_ns"
											}
										}
										];
									}else{
										programme['episode-num'] = [
										{
											"_": episodeNum,
											"$": {
												"system": "onscreen"
											}
										}
										];
									}

									// Sacamos la ruta de la imagen
									if (indexPrograma !== -1 ) {
										if (progPreferences.programasJSON[indexPrograma].image.length > 0){

											programme['icon'] = [
											{
												"$": {
													"src": progPreferences.urlimagenes + progPreferences.programasJSON[indexPrograma].image.replace(/\\/g,"")
												}
											}
											];
										}
									}

									// Añadimos pais de origen si existe
									if (indexPrograma !== -1 ) {
										if (progPreferences.programasJSON[indexPrograma].country.length > 0){

											programme['country'] = [
											{
												"_" : progPreferences.programasJSON[indexPrograma].country
											}
											];
										}
									}

									// Añadimos el reparto si existe, falta arreglar la forma de incluirlos
									if (indexPrograma !== -1){
										debugger;

										let castItems = ["director","script","actors","producer","production","presented_by","photography","music","creator","guest_actors"];

										let tempCredits = [];

										// Creamos array con los roles existentes.
										castItems.map(cast => {
											if (progPreferences.programasJSON[indexPrograma][cast] && progPreferences.programasJSON[indexPrograma][cast] !== ""){
												
												let tempArray = progPreferences.programasJSON[indexPrograma][cast].split(',');
												for (let i=0; i< tempArray.length; i++){
													// Si no existe la categoria la creo

													let credits = {}
													if (tempArray[i]){
														credits = {
															"_": tempArray[i].trim()
														};
													}
													
													if (cast === "actors") cast = "actor";
													if (cast === "presented_by") cast = "presenter";
													if (cast === "music") cast = "composer";
													if (cast === "guest_actors") cast = "guest";
													
													if (!programme['credits']) programme['credits'] = {};
													if (!programme['credits'][cast]) programme['credits'][cast] = [];
													programme['credits'][cast].push(credits);
												}
											}

										});
									}

									// Sacamos la calificación por edades
									if (indexPrograma !== -1 ) {

										let edades = ['0','0','0','7','12','16','18'];

										programme['rating'] = [
										{
											"value": edades[progPreferences.programasJSON[indexPrograma].id_parental],
											"$": {
												"system": "es"
											}
										}
										];
									}

									// Añado el programa al buffer de salida
									progPreferences.jsontv.tv.programme.push(programme);
									progPreferences.numProgrammes = progPreferences.numProgrammes + 1;
								}// Fin loop For de los programas
							}
						}
					}
				}
			}
			//return (progPreferences.jsontv);
		} // Fin for lectura indice de tres días
	},

	// Tvheadend reconoce la categoría xmltv solo si coincide con alguna de las
	// definidas en el estándar DVB. Ver el fuente de tvheadend/src/epg.c
	// https://github.com/tvheadend/tvheadend/blob/master/src/epg.c
	// Además, solo tiene 10 configuradas. Este método mapea las que vienen
	// de El Pais a una de estas 10.
	//

	getCategoriaSection: function (section) {

		section = parseInt(section);

		switch (section) {

			case 2: // Otros
			return "Education / Science / Factual topics";

			case 3: // Informativos
			return "News Magazine";

			case 4:
			return "Sports";

			case 6: // Series
			return "Show / Game show"

			case 7: // Peliculas
			return "Film / Cinema";

			case 8: // Infantil
			return "Children's / Youth programs";

			default:
			return "Social / Political issues / Economics";
		}
	},

	getCategoriaByName: function (genre, subgenre) {

		if (/Otros/.test(subgenre) && !/Otros/.test(genre)){
			switch (true) {

				case /Cine/.test(genre):
				case /Cortometraje/.test(genre):
				return "Film / Cinema";

				case /Deportes/.test(genre):
				return "Sports";

				case /Documental/.test(genre):
				return "Documentary";

				case /Entretenimiento/.test(genre):
				case /Otros/.test(genre):
				return "Variety show";

				case /Infantil/.test(genre):
				return "Children's / Youth programs";

				case /Informativo/.test(genre):
				return "News / Current affairs";

				case /Música/.test(genre):
				return "Music / Ballet / Dance";

				case /Ocio-Cultura/.test(genre):
				return "Leisure hobbies";

				case /Serie/.test(genre):
				return "Show / Game show";

				default:
				return "Social / Political issues / Economics";

			}
		}

		switch (true) {

			case /Película para adultos/.test(subgenre):
			return "Adult movie / Drama";

			case /Animación/.test(subgenre):
			case /Dibujos animados/.test(subgenre):
			return "Cartoons / Puppets";

			case /Infantil/.test(subgenre):
			return "Children's / Youth programs";

			case /Humor/.test(subgenre):
			case /Comedia/.test(subgenre):
			return "Comedy";

			case /Romántica/.test(subgenre):
			case /Telenovela/.test(subgenre):
			return "Romance";

			case /Debate/.test(subgenre):
			case /Debates/.test(subgenre):
			case /Entrevista/.test(subgenre):
			case /Entrevistas/.test(subgenre):
			return "Discussion / Interview / Debate";

			case /Biográfico/.test(subgenre):
			case /Biográficos/.test(subgenre):
			case /Documental/.test(subgenre):
			case /Documentales/.test(subgenre):
			case /Historia/.test(subgenre):
			return "Documentary";

			case /Viaje/.test(subgenre):
			case /Viajes/.test(subgenre):
			return "Tourism / Travel";

			case /Gastronomía/.test(subgenre):
			case /Cocina/.test(subgenre):
			return "Cooking";

			case /Cine/.test(subgenre):
			case /Acción/.test(subgenre):
			return "Film / Cinema";

			case /Fitness/.test(subgenre):
			case /Salud/.test(subgenre):
			return "Fitness and health";

			case /Ocio y Aficiones/.test(subgenre):
			case /Hobbies/.test(subgenre):
			return "Leisure hobbies";

			case /Magazine/.test(subgenre):
			case /Magazines/.test(subgenre):
			case /Reportaje/.test(subgenre):
			case /Reportajes/.test(subgenre):
			case /Sociedad/.test(subgenre):
			return "Magazines / Reports / Documentary";

			case /Corto/.test(subgenre):
			case /Cortometraje/.test(subgenre):
			case /Drama/.test(subgenre):
			case /Telefilme/.test(subgenre):
			return "Movie / Drama";

			case /Música/.test(subgenre):
			case /Videoclips/.test(subgenre):
			case /Concierto/.test(subgenre):
			return "Music / Ballet / Dance";

			case /Musical/.test(subgenre):
			case /Musicales/.test(subgenre):
			return "Musical / Opera";

			case /Naturaleza/.test(subgenre):
			case /Naturaleza y animales/.test(subgenre):
			case /Caza y pesca/.test(subgenre):
			return "Nature / Animals / Environment";

			case /Actualidad/.test(subgenre):
			case /Información/.test(subgenre):
			case /Noticias/.test(subgenre):
			case /Informativo/.test(subgenre):
			case /Informativos/.test(subgenre):
			case /Crónica Rosa/.test(subgenre):
			case /Crónica/.test(subgenre):
			return "News / Current affairs";

			case /Especial/.test(subgenre):
			return "News / Magazine";

			case /Espectáculo/.test(subgenre):
			return "Performing arts";

			case /Toros/.test(subgenre):
			return "Popular culture / Traditional arts";

			case /Fantasía/.test(subgenre):
			case /Fantásticas/.test(subgenre):
			case /Ciencia Ficción/.test(subgenre):
			case /Terror/.test(subgenre):
			return "Science fiction / Fantasy / Horror";

			case /Religion/.test(subgenre):
			case /Religioso/.test(subgenre):
			case /Histórica/.test(subgenre):
			case /Histórico/.test(subgenre):
			return "Serious / Classical / Religious / Historical movie / Drama";

			case /Clásica/.test(subgenre):
			return "Serious music / Classical music";

			case /Programa/.test(subgenre):
			case /Programas/.test(subgenre):
			return "Show / Game show";

			case /Serie/.test(subgenre):
			case /Series/.test(subgenre):
			return "Show / Game show";

			case /Política/.test(subgenre):
			return "Social / Political issues / Economics";

			case /Evento especial/.test(subgenre):
			case /Eventos especiales/.test(subgenre):
			return "Special events (Olympic Games, World Cup, etc.)";

			case /Ciclismo/.test(subgenre):
			case /Baloncesto/.test(subgenre):
			case /Billar/.test(subgenre):
			case /Deporte/.test(subgenre):
			case /Deportes/.test(subgenre):
			case /Otros deportes/.test(subgenre):
			case /Patinaje/.test(subgenre):
			return "Sports";

			case /Esquí/.test(subgenre):
			case /Deportes de invierno/.test(subgenre):
			return "Winter sports";

			case /Automovilismo/.test(subgenre):
			case /Motociclismo/.test(subgenre):
			case /Motor/.test(subgenre):
			return "Motor sport";

			case /Hípica/.test(subgenre):
			return "Equestrian";

			case /Pelota \/ Frontón/.test(subgenre):
			return "Tennis / Squash";

			case /Lucha/.test(subgenre):
			return "Martial sports";

			case /Champions League/.test(subgenre):
			case /Fútbol/.test(subgenre):
			case /Fútbol Champions League/.test(subgenre):
			return "Football / Soccer";

			case /Idiomas/.test(subgenre):
			return "Languages";

			case /Ciencia y tecnología/.test(subgenre):
			case /Científico/.test(subgenre):
			return "Technology / Natural sciences";

			case /Medicina/.test(subgenre):
			case /Médicos/.test(subgenre):
			return "Medicine / Physiology / Psychology";

			case /Moda/.test(subgenre):
			return "Fashion";

			case /Concurso/.test(subgenre):
			case /Concursos/.test(subgenre):
			return "Game show / Quiz / Contest";

			case /Entretenimiento/.test(subgenre):
			case /Otros/.test(subgenre):
			case /Reality Show/.test(subgenre):
			case /Tele Realidad/.test(subgenre):
			case /Zapping/.test(subgenre):
			case /Variedades/.test(subgenre):
			return "Variety show";

			case /Cultural/.test(subgenre):
			case /Educativo/.test(subgenre):
			case /Decoración/.test(subgenre):
			case /Educativo/.test(subgenre):
			case /Bricolaje/.test(subgenre):
			return "Informational / Educational / School programs";

			case /Arte/.test(subgenre):
			case /Cultura/.test(subgenre):
			return "Arts / Culture (without music)";

			case /Literatura/.test(subgenre):
			return "Literature";

			case /Aventuras/.test(subgenre):
			case /Bélica/.test(subgenre):
			case /Bélico/.test(subgenre):
			case /Western/.test(subgenre):
			return "Adventure / Western / War";

			case /Economía/.test(subgenre):
			return "Social / Political issues / Economics";

			case /Policíaca/.test(subgenre):
			case /Policíaco/.test(subgenre):
			case /Thriller/.test(subgenre):
			return 'Detective / Thriller'

			case /Infantil (de 7 a 12)/.test(subgenre):
			return "Entertainment programs for 6 to 14";

			case /Preescolar (Menores de 7)/.test(subgenre):
			return "Pre-school children's programs";

			case /Talk-Show/.test(subgenre):
			return "Talk show";

			case /Tiempo/.test(subgenre):
			return "News / Weather report";

			case /Televenta/.test(subgenre):
			return "Advertisement / Shopping";

			case /Jardinería/.test(subgenre):
			return "Gardening";

			default:
			return "Social / Political issues / Economics";
		}
	},

	// Convierto de formato JSONTV a XMLTV
	convierteJSONTVaXMLTV: function (datosJSONTV) {
		// Preparo el builder
		let builder = new xml2js.Builder({ headless: false }); //true

		// Devuelvo la Conversión
		return builder.buildObject(datosJSONTV);
	},


	/*
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
	*/
	defaultDiacriticsRemovalMap: [
	{ 'base': 'A', 'letters': '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
	{ 'base': 'AA', 'letters': '\uA732' },
	{ 'base': 'AE', 'letters': '\u00C6\u01FC\u01E2' },
	{ 'base': 'AO', 'letters': '\uA734' },
	{ 'base': 'AU', 'letters': '\uA736' },
	{ 'base': 'AV', 'letters': '\uA738\uA73A' },
	{ 'base': 'AY', 'letters': '\uA73C' },
	{ 'base': 'B', 'letters': '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
	{ 'base': 'C', 'letters': '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
	{ 'base': 'D', 'letters': '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0' },
	{ 'base': 'DZ', 'letters': '\u01F1\u01C4' },
	{ 'base': 'Dz', 'letters': '\u01F2\u01C5' },
	{ 'base': 'E', 'letters': '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
	{ 'base': 'F', 'letters': '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
	{ 'base': 'G', 'letters': '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
	{ 'base': 'H', 'letters': '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
	{ 'base': 'I', 'letters': '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
	{ 'base': 'J', 'letters': '\u004A\u24BF\uFF2A\u0134\u0248' },
	{ 'base': 'K', 'letters': '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
	{ 'base': 'L', 'letters': '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
	{ 'base': 'LJ', 'letters': '\u01C7' },
	{ 'base': 'Lj', 'letters': '\u01C8' },
	{ 'base': 'M', 'letters': '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
	{ 'base': 'N', 'letters': '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
	{ 'base': 'NJ', 'letters': '\u01CA' },
	{ 'base': 'Nj', 'letters': '\u01CB' },
	{ 'base': 'O', 'letters': '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
	{ 'base': 'OI', 'letters': '\u01A2' },
	{ 'base': 'OO', 'letters': '\uA74E' },
	{ 'base': 'OU', 'letters': '\u0222' },
	{ 'base': 'OE', 'letters': '\u008C\u0152' },
	{ 'base': 'oe', 'letters': '\u009C\u0153' },
	{ 'base': 'P', 'letters': '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
	{ 'base': 'Q', 'letters': '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
	{ 'base': 'R', 'letters': '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
	{ 'base': 'S', 'letters': '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
	{ 'base': 'T', 'letters': '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
	{ 'base': 'TZ', 'letters': '\uA728' },
	{ 'base': 'U', 'letters': '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
	{ 'base': 'V', 'letters': '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
	{ 'base': 'VY', 'letters': '\uA760' },
	{ 'base': 'W', 'letters': '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
	{ 'base': 'X', 'letters': '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
	{ 'base': 'Y', 'letters': '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
	{ 'base': 'Z', 'letters': '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
	{ 'base': 'a', 'letters': '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
	{ 'base': 'aa', 'letters': '\uA733' },
	{ 'base': 'ae', 'letters': '\u00E6\u01FD\u01E3' },
	{ 'base': 'ao', 'letters': '\uA735' },
	{ 'base': 'au', 'letters': '\uA737' },
	{ 'base': 'av', 'letters': '\uA739\uA73B' },
	{ 'base': 'ay', 'letters': '\uA73D' },
	{ 'base': 'b', 'letters': '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
	{ 'base': 'c', 'letters': '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
	{ 'base': 'd', 'letters': '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
	{ 'base': 'dz', 'letters': '\u01F3\u01C6' },
	{ 'base': 'e', 'letters': '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
	{ 'base': 'f', 'letters': '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
	{ 'base': 'g', 'letters': '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
	{ 'base': 'h', 'letters': '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
	{ 'base': 'hv', 'letters': '\u0195' },
	{ 'base': 'i', 'letters': '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
	{ 'base': 'j', 'letters': '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
	{ 'base': 'k', 'letters': '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
	{ 'base': 'l', 'letters': '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
	{ 'base': 'lj', 'letters': '\u01C9' },
	{ 'base': 'm', 'letters': '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
	{ 'base': 'n', 'letters': '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
	{ 'base': 'nj', 'letters': '\u01CC' },
	{ 'base': 'o', 'letters': '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
	{ 'base': 'oi', 'letters': '\u01A3' },
	{ 'base': 'ou', 'letters': '\u0223' },
	{ 'base': 'oo', 'letters': '\uA74F' },
	{ 'base': 'p', 'letters': '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
	{ 'base': 'q', 'letters': '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
	{ 'base': 'r', 'letters': '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
	{ 'base': 's', 'letters': '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
	{ 'base': 't', 'letters': '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
	{ 'base': 'tz', 'letters': '\uA729' },
	{ 'base': 'u', 'letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
	{ 'base': 'v', 'letters': '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
	{ 'base': 'vy', 'letters': '\uA761' },
	{ 'base': 'w', 'letters': '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
	{ 'base': 'x', 'letters': '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
	{ 'base': 'y', 'letters': '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
	{ 'base': 'z', 'letters': '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' }
	],

	diacriticsMap: {},

	// Inicializa el poder eliminar caracteres diacríticos
	initDiacritics: function (str) {
		for (var i = 0; i < utils.defaultDiacriticsRemovalMap.length; i++) {
			var letters = utils.defaultDiacriticsRemovalMap[i].letters;
			for (var j = 0; j < letters.length; j++) {
				utils.diacriticsMap[letters[j]] = utils.defaultDiacriticsRemovalMap[i].base;
			}
		}
	},

	// Elimina los caracteres diacríticos de un string.
	removeDiacritics: function (str) {
		return str.replace(/[^\u0000-\u007E]/g, function (a) {
			return utils.diacriticsMap[a] || a;
		});
	}

}

export default utils;
