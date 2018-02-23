//
// LuisPa 2017/01/06
//
// Aquí configuro todos los canales de TV que quiero tener disponibles en los
// dispositivos que van por la red casera (LAN/Ethernet), por lo que voy a
// configurar las versiones Canales HD de lo mismos (excepto aquellos que solo emiten en SD).
//
// DISCLAIMER: Seguro que faltarán algunos canales, bien porque no los
// consumo, mi demarcación o somplemente no los tengo contratados,
// edita este fichero a tu gusto
//
// URL's interesantes que he usado para investigar nombres los id's
//  http://www.elpaisplus.es/diales/
//  http://www1.elpaisplus.es/canal/Hollywood/<elpais_id>  (para FRA EN = FRA%20EN)
//  http://www.elpaisplus.es/recorte/m-NEO/canal/<elpais_id>.png
//
// Claves utilizadas. Indico cuales se usan para construir el fichero XMLTV
// y cuales para crear los ficheros M3U que usaré para importación dinámica IPTV en Tvheadend
//
//   "elpais_epg": false,                    // Solicitar el EPG de esta cadena. [XMLTV]
//   "elpais_fuente": "239.0.3.37:8208",    // Dirección streaming al crear el m3u para tvheadend. [M3U]
//   "elpais_id": "TVG",                    // ID interno utilizado por elpais, necesario para pedir el EPG. [XMLTV]
//   "elpais_nombre": "TV Galicia",         // Nombre del canal original que asigna elpais. [Informativo y control]
//   "elpais_numero": "151",                // Número de canal original que asigna elpais. [M3U]
//   "tvh_id": "TVG.es",                      // ID interno que pondré en el fichero M3U para tvheadend. [M3U]
//     Es el identificativo del Canal que usa Tvheadend al importar el fichero
//     XMLTV y su valor DEBE ser compatible con lo que manda el DTD de xmltv:
//     http://xmltv.cvs.sourceforge.net/viewvc/xmltv/xmltv/xmltv.dtd
//      "..Each channel has one id attribute, which must be unique and should
//      preferably be in the form suggested by RFC2838 (the 'broadcast'
//      element of the grammar in that RFC, in other words, a DNS-like name
//      but without any URI scheme).."
//   "tvh_m3u": false,                         // Añadir este canal al fichero M3U para tvheadend. [M3U]
//   "tvh_nombre": "TV Galicia",              // Nombre del canal que pondré en el fichero M3U para tvheadend. [M3U]
//    "tvh_tag": "Canales HD|Favoritos"                    // Identifica los Channel Tags (etiquetas) que quieres asignar al canal,   [M3U]
//      Puedes poner varios separándolos por el símbolo " | " (pipe). En mi caso etiqueto los canales
//      de la siguiente forma:
//      - Canales HD : Aquellos que emiten en Canales HD.
//      - SD : Los que emiten en SD.
//      - TV : Se lo asigno a todos aquellos canales que quiero que me salgan en las TV's, en principio
//             todos los que están en este fichero (cadenas.js) que considero como la lista principal
//             tener en los TV's en mi casa, ya sean Canales HD o SD. La forma de conseguirlo es crar un usuario
//             para el KODI de la TV y asociar esta etiqueta "TV" a dicho usuario.
//   "tvh_fuente": "http://user:pass@otro.servidor.com:9981/stream/chanelid/202116655?ticket=FA7504..."   [M3U]
//      Este último campo verás que no lo uso pero lo he implementado porque estuve
//      haciendo pruebas haciendo que un par de canales tirasen desde OTRO Tvheadend.
//      Si tenemos este campo en la cadena entonces se usará a la hora de crear el M3U
//      en vez de [uri_prefix]{elpais_fuente}
//
const cadenasFavoritos = [
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.185:8208",
	"elpais_id": "DESCONOCIDO1",
	"elpais_nombre": "elpais+",
	"elpais_numero": "0",
	"tvh_id": "elpais.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais+",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.192:58192",
	"elpais_id": "TVE",
	"elpais_nombre": "LA 1",
	"elpais_numero": "1",
	"tvh_id": "TVE.es",
	"tvh_m3u": false,
	"tvh_nombre": "La 1 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.162:58162",
	"elpais_id": "LA2",
	"elpais_nombre": "LA 2",
	"elpais_numero": "2",
	"tvh_id": "LA2.es",
	"tvh_m3u": false,
	"tvh_nombre": "La 2",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.145:58145",
	"elpais_id": "A3",
	"elpais_nombre": "Antena 3",
	"elpais_numero": "3",
	"tvh_id": "A3.es",
	"tvh_m3u": false,
	"tvh_nombre": "Antena 3 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.156:58156",
	"elpais_id": "C4",
	"elpais_nombre": "Cuatro",
	"elpais_numero": "4",
	"tvh_id": "C4.es",
	"tvh_m3u": false,
	"tvh_nombre": "Cuatro HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.155:58155",
	"elpais_id": "T5",
	"elpais_nombre": "Telecinco",
	"elpais_numero": "5",
	"tvh_id": "T5.es",
	"tvh_m3u": false,
	"tvh_nombre": "Telecinco HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.147:58147",
	"elpais_id": "SEXTA",
	"elpais_nombre": "La Sexta",
	"elpais_numero": "6",
	"tvh_id": "SEXTA.es",
	"tvh_m3u": false,
	"tvh_nombre": "La Sexta HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.187:8208",
	"elpais_id": "MV3",
	"elpais_nombre": "#0",
	"elpais_numero": "7",
	"tvh_id": "MV3.es",
	"tvh_m3u": false,
	"tvh_nombre": "#0 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.25:8208",
	"elpais_id": "DESCONOCIDO2",
	"elpais_nombre": "Telemadrid",
	"elpais_numero": "8",
	"tvh_id": "Telemadrid.es",
	"tvh_m3u": false,
	"tvh_nombre": "Telemadrid",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.26:8208",
	"elpais_id": "OTRA",
	"elpais_nombre": "La Otra",
	"elpais_numero": "9",
	"tvh_id": "OTRA.es",
	"tvh_m3u": false,
	"tvh_nombre": "La Otra",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.184:8208",
	"elpais_id": "CABECERA_SERIES",
	"elpais_nombre": "SERIES",
	"elpais_numero": "10",
	"tvh_id": "CABECERA_SERIES.es",
	"tvh_m3u": false,
	"tvh_nombre": "CABECERA SERIES HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.250:8208",
	"elpais_id": "CPSER",
	"elpais_nombre": "elpais Series",
	"elpais_numero": "11",
	"tvh_id": "CPSER.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Series HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.83:8208",
	"elpais_id": "MV2",
	"elpais_nombre": "elpais Series Xtra",
	"elpais_numero": "12",
	"tvh_id": "MV2.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Series Xtra HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.116:1234",
	"elpais_id": "FOXGE",
	"elpais_nombre": "Fox",
	"elpais_numero": "13",
	"tvh_id": "FOXGE.es",
	"tvh_m3u": false,
	"tvh_nombre": "FOX",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.108:1234",
	"elpais_id": "63",
	"elpais_nombre": "AXN",
	"elpais_numero": "14",
	"tvh_id": "AXN.es",
	"tvh_m3u": false,
	"tvh_nombre": "AXN",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.111:1234",
	"elpais_id": "TNT",
	"elpais_nombre": "TNT",
	"elpais_numero": "15",
	"tvh_id": "TNT.es",
	"tvh_m3u": false,
	"tvh_nombre": "TNT",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.113:1234",
	"elpais_id": "PCM",
	"elpais_nombre": "Comedy Central",
	"elpais_numero": "16",
	"tvh_id": "PCM.es",
	"tvh_m3u": false,
	"tvh_nombre": "Comedy Central",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.107:1234",
	"elpais_id": "CL13",
	"elpais_nombre": "Calle 13",
	"elpais_numero": "17",
	"tvh_id": "CL13.es",
	"tvh_m3u": false,
	"tvh_nombre": "Calle 13",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.119:1234",
	"elpais_id": "COSMO",
	"elpais_nombre": "COSMO",
	"elpais_numero": "18",
	"tvh_id": "COSMO.es",
	"tvh_m3u": false,
	"tvh_nombre": "COSMO",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.9.132:8208",
	"elpais_id": "AMC",
	"elpais_nombre": "AMC",
	"elpais_numero": "19",
	"tvh_id": "AMC.es",
	"tvh_m3u": false,
	"tvh_nombre": "AMC HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.109:1234",
	"elpais_id": "FOXCR",
	"elpais_nombre": "Fox Life",
	"elpais_numero": "20",
	"tvh_id": "FOXCR.es",
	"tvh_m3u": false,
	"tvh_nombre": "FOX life",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.79:8208",
	"elpais_id": "SET",
	"elpais_nombre": "AXN White",
	"elpais_numero": "21",
	"tvh_id": "SET.es",
	"tvh_m3u": false,
	"tvh_nombre": "AXN White HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.120:1234",
	"elpais_id": "SCI-FI",
	"elpais_nombre": "SYFY",
	"elpais_numero": "22",
	"tvh_id": "SCI-FI.es",
	"tvh_m3u": false,
	"tvh_nombre": "SyFy",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.170:8208",
	"elpais_id": "NONSTP",
	"elpais_nombre": "Non Stop People",
	"elpais_numero": "23",
	"tvh_id": "NONSTP.es",
	"tvh_m3u": false,
	"tvh_nombre": "Non Stop People HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.211:8208",
	"elpais_id": "MTV",
	"elpais_nombre": "MTV",
	"elpais_numero": "24",
	"tvh_id": "MTV.es",
	"tvh_m3u": false,
	"tvh_nombre": "MTV",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.153:58153",
	"elpais_id": "FDFIC",
	"elpais_nombre": "Factoría de Ficción",
	"elpais_numero": "25",
	"tvh_id": "FDFIC.es",
	"tvh_m3u": false,
	"tvh_nombre": "Factoría de Ficción",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.149:58149",
	"elpais_id": "NEOX",
	"elpais_nombre": "Neox",
	"elpais_numero": "26",
	"tvh_id": "NEOX.es",
	"tvh_m3u": false,
	"tvh_nombre": "Neox",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.194:58194",
	"elpais_id": "ATRESS",
	"elpais_nombre": "Atreseries",
	"elpais_numero": "27",
	"tvh_id": "ATRESS.es",
	"tvh_m3u": false,
	"tvh_nombre": "Atreseries HD",
	"tvh_tag": "Canales HD"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.166:58166",
	"elpais_id": "ENERGY",
	"elpais_nombre": "Energy",
	"elpais_numero": "28",
	"tvh_id": "ENERGY.es",
	"tvh_m3u": false,
	"tvh_nombre": "Energy",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.30:8208",
	"elpais_id": "CABECERA_CINE",
	"elpais_nombre": "CINE",
	"elpais_numero": "30",
	"tvh_id": "CABECERA_CINE.es",
	"tvh_m3u": false,
	"tvh_nombre": "CABECERA CINE",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.111:8208",
	"elpais_id": "MV1",
	"elpais_nombre": "elpais Estrenos",
	"elpais_numero": "31",
	"tvh_id": "MV1.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Estrenos HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.112:8208",
	"elpais_id": "CPXTRA",
	"elpais_nombre": "elpais Xtra",
	"elpais_numero": "32",
	"tvh_id": "CPXTRA.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Xtra HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.113:8208",
	"elpais_id": "CPACCI",
	"elpais_nombre": "elpais Acción",
	"elpais_numero": "33",
	"tvh_id": "CPACCI.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Acción HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.114:8208",
	"elpais_id": "CPCOME",
	"elpais_nombre": "elpais Comedia",
	"elpais_numero": "34",
	"tvh_id": "CPCOME.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Comedia HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.115:8208",
	"elpais_id": "CPCOLE",
	"elpais_nombre": "elpais DCine",
	"elpais_numero": "35",
	"tvh_id": "CPCOLE.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais DCine HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.45:8208",
	"elpais_id": "DCESP",
	"elpais_nombre": "elpais Cine Español",
	"elpais_numero": "36",
	"tvh_id": "DCESP.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Cine Español HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.112:1234",
	"elpais_id": "TCM",
	"elpais_nombre": "TCM",
	"elpais_numero": "37",
	"tvh_id": "TCM.es",
	"tvh_m3u": false,
	"tvh_nombre": "TCM",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.76:8208",
	"elpais_id": "HOLLYW",
	"elpais_nombre": "Hollywood",
	"elpais_numero": "38",
	"tvh_id": "HOLLYW.es",
	"tvh_m3u": false,
	"tvh_nombre": "Hollywood HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.72:8208",
	"elpais_id": "SUNDAN",
	"elpais_nombre": "Sundance",
	"elpais_numero": "39",
	"tvh_id": "SUNDAN.es",
	"tvh_m3u": false,
	"tvh_nombre": "Sundance",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.39:8208",
	"elpais_id": "DARK",
	"elpais_nombre": "DARK",
	"elpais_numero": "40",
	"tvh_id": "DARK.es",
	"tvh_m3u": false,
	"tvh_nombre": "DARK",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.91:8208",
	"elpais_id": "13TV",
	"elpais_nombre": "13 TV",
	"elpais_numero": "41",
	"tvh_id": "13TV.es",
	"tvh_m3u": false,
	"tvh_nombre": "13 TV",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": true,
	"elpais_fuente": "239.123.123.121:58121",
	"elpais_id": "889",
	"elpais_nombre": "TEN",
	"elpais_numero": "42",
	"tvh_id": "TEN.es",
	"tvh_m3u": false,
	"tvh_nombre": "TEN",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.158:58158",
	"elpais_id": "PARCH",
	"elpais_nombre": "Paramount Channel",
	"elpais_numero": "43",
	"tvh_id": "PARCH.es",
	"tvh_m3u": false,
	"tvh_nombre": "Paramount Channel",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.180:8208",
	"elpais_id": "CABECERA DEPORTES",
	"elpais_nombre": "DEPORTES",
	"elpais_numero": "44",
	"tvh_categoria": "Sports",
	"tvh_id": "CABECERA_DEPORTES.es",
	"tvh_m3u": false,
	"tvh_nombre": "CABECERA DEPORTES HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.6.14:8208",
	"elpais_id": "CPFUT",
	"elpais_nombre": "elpais Fútbol",
	"elpais_numero": "45",
	"tvh_categoria": "Sports",
	"tvh_id": "CPFUT.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Fútbol HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.84:8208",
	"elpais_id": "CPPART",
	"elpais_nombre": "elpais Partidazo",
	"elpais_numero": "46",
	"tvh_categoria": "Sports",
	"tvh_id": "CPPART.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Partidazo HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.252:8208",
	"elpais_id": "BELIGA",
	"elpais_nombre": "Bein LaLiga",
	"elpais_numero": "47",
	"tvh_categoria": "Sports",
	"tvh_id": "BELIGA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Bein LaLiga HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.253:8208",
	"elpais_id": "BELIG1",
	"elpais_nombre": "Bein LaLiga 1",
	"elpais_numero": "48",
	"tvh_categoria": "Sports",
	"tvh_id": "BELIG1.es",
	"tvh_m3u": false,
	"tvh_nombre": "Bein LaLiga 1 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.254:8208",
	"elpais_id": "BELIG2",
	"elpais_nombre": "Bein LaLiga 2",
	"elpais_numero": "49",
	"tvh_categoria": "Sports",
	"tvh_id": "BELIG2.es",
	"tvh_m3u": false,
	"tvh_nombre": "Bein LaLiga 2 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.9.80:8208",
	"elpais_id": "CHUEFA",
	"elpais_nombre": "beIN SPORTS ",
	"elpais_numero": "50",
	"tvh_categoria": "Sports",
	"tvh_id": "CHUEFA.es",
	"tvh_m3u": false,
	"tvh_nombre": "beIN SPORTS HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.9.81:8208",
	"elpais_id": "BEMAX1",
	"elpais_nombre": "Bein Max1",
	"elpais_numero": "51",
	"tvh_categoria": "Sports",
	"tvh_id": "BEMAX1.es",
	"tvh_m3u": false,
	"tvh_nombre": "Bein Max1 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.102:8208",
	"elpais_id": "BEMAX2",
	"elpais_nombre": "Bein Max2",
	"elpais_numero": "52",
	"tvh_categoria": "Sports",
	"tvh_id": "BEMAX2.es",
	"tvh_m3u": false,
	"tvh_nombre": "Bein Max2",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.179:8208",
	"elpais_id": "REALM",
	"elpais_nombre": "Real Madrid TV",
	"elpais_numero": "53",
	"tvh_categoria": "Sports",
	"tvh_id": "REALM.es",
	"tvh_m3u": false,
	"tvh_nombre": "Real Madrid TV HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.65:8208",
	"elpais_id": "BARNA",
	"elpais_nombre": "Barça TV",
	"elpais_numero": "54",
	"tvh_categoria": "Sports",
	"tvh_id": "BARNA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Barça TV",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.248:8208",
	"elpais_id": "CPDEP",
	"elpais_nombre": "elpais Deportes 1",
	"elpais_numero": "55",
	"tvh_categoria": "Sports",
	"tvh_id": "CPDEP.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Deportes 1 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.245:8208",
	"elpais_id": "CPD2",
	"elpais_nombre": "elpais Deportes 2",
	"elpais_numero": "56",
	"tvh_categoria": "Sports",
	"tvh_id": "CPD2.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Deportes 2 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": true,
	"elpais_fuente": "239.0.5.246:8208",
	"elpais_id": "798",
	"elpais_nombre": "Movistar Fórmula 1",
	"elpais_numero": "57",
	"tvh_categoria": "Sports",
	"tvh_id": "MVF1.es",
	"tvh_m3u": false,
	"tvh_nombre": "Movistar Fórmula 1 HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": true,
	"elpais_fuente": "239.0.5.107:8208",
	"elpais_id": "804",
	"elpais_nombre": "Movistar Moto GP",
	"elpais_numero": "58",
	"tvh_categoria": "Sports",
	"tvh_id": "MVMTGP.es",
	"tvh_m3u": false,
	"tvh_nombre": "Movistar Moto GP HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.249:8208",
	"elpais_id": "GOLF+",
	"elpais_nombre": "elpais Golf",
	"elpais_numero": "59",
	"tvh_categoria": "Sports",
	"tvh_id": "GOLF.TV.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Golf HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.106:1234",
	"elpais_id": "ESP",
	"elpais_nombre": "Eurosport 1",
	"elpais_numero": "60",
	"tvh_categoria": "Sports",
	"tvh_id": "ESP.es",
	"tvh_m3u": false,
	"tvh_nombre": "Eurosport 1 HD",
	"tvh_tag": "Canales HD"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.44:1234",
	"elpais_id": "ESP2",
	"elpais_nombre": "Eurosport 2",
	"elpais_numero": "61",
	"tvh_categoria": "Sports",
	"tvh_id": "ESP2.es",
	"tvh_m3u": false,
	"tvh_nombre": "Eurosport 2",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.189:8208",
	"elpais_id": "GOLHD",
	"elpais_nombre": "GOL",
	"elpais_numero": "62",
	"tvh_categoria": "Sports",
	"tvh_id": "GOLHD.es",
	"tvh_m3u": false,
	"tvh_nombre": "GOL HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.188:8208",
	"elpais_id": "TDEP",
	"elpais_nombre": "Teledeporte",
	"elpais_numero": "63",
	"tvh_categoria": "Sports",
	"tvh_id": "TDEP.es",
	"tvh_m3u": false,
	"tvh_nombre": "Teledeporte HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.97:8208",
	"elpais_id": "FUTREP",
	"elpais_nombre": "Canal Fútbol Replay",
	"elpais_numero": "64",
	"tvh_categoria": "Sports",
	"tvh_id": "FUTREP.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal Fútbol Replay",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.6.54:8208",
	"elpais_id": "CAZPES",
	"elpais_nombre": "Caza y Pesca",
	"elpais_numero": "65",
	"tvh_categoria": "Nature / Animals / Environment",
	"tvh_id": "CAZPES.es",
	"tvh_m3u": false,
	"tvh_nombre": "Caza y Pesca HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.188:8208",
	"elpais_id": "IBERAL",
	"elpais_nombre": "Iberalia TV",
	"elpais_numero": "66",
	"tvh_id": "IBERAL.es",
	"tvh_m3u": false,
	"tvh_nombre": "Iberalia TV HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.191:8208",
	"elpais_id": "CFERIA",
	"elpais_nombre": "Toros TV",
	"elpais_numero": "67",
	"tvh_categoria": "Arts / Culture (without music)",
	"tvh_id": "CFERIA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Toros TV HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.125:1234",
	"elpais_id": "NATGEO",
	"elpais_nombre": "National Geographic",
	"elpais_numero": "70",
	"tvh_categoria": "Education / Science / Factual topics",
	"tvh_id": "NATGEO.es",
	"tvh_m3u": false,
	"tvh_nombre": "National Geographic",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.118:1234",
	"elpais_id": "NATGW",
	"elpais_nombre": "Nat Geo Wild",
	"elpais_numero": "71",
	"tvh_categoria": "Education / Science / Factual topics",
	"tvh_id": "NATGW.es",
	"tvh_m3u": false,
	"tvh_nombre": "Nat Geo Wild",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.19:8208",
	"elpais_id": "HIST",
	"elpais_nombre": "Historia",
	"elpais_numero": "72",
	"tvh_categoria": "Education / Science / Factual topics",
	"tvh_id": "HIST.es",
	"tvh_m3u": false,
	"tvh_nombre": "Historia",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.127:1234",
	"elpais_id": "DCR",
	"elpais_nombre": "Discovery",
	"elpais_numero": "73",
	"tvh_categoria": "Education / Science / Factual topics",
	"tvh_id": "DCR.es",
	"tvh_m3u": false,
	"tvh_nombre": "Discovery Channel",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.5.82:8208",
	"elpais_id": "ODISEA",
	"elpais_nombre": "Odisea",
	"elpais_numero": "74",
	"tvh_id": "ODISEA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Odisea HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.38:8208",
	"elpais_id": "BIOGRA",
	"elpais_nombre": "A&E",
	"elpais_numero": "75",
	"tvh_id": "BIOGRA.es",
	"tvh_m3u": false,
	"tvh_nombre": "A&E",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.115:1234",
	"elpais_id": "VJR",
	"elpais_nombre": "Viajar",
	"elpais_numero": "76",
	"tvh_categoria": "Arts / Culture (without music)",
	"tvh_id": "VJR.es",
	"tvh_m3u": false,
	"tvh_nombre": "Viajar",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.159:58159",
	"elpais_id": "DCRMAX",
	"elpais_nombre": "Discovery Max",
	"elpais_numero": "77",
	"tvh_categoria": "Arts / Culture (without music)",
	"tvh_categoria": "Education / Science / Factual topics",
	"tvh_id": "DCRMAX.es",
	"tvh_m3u": false,
	"tvh_nombre": "Discovery Max",
	"tvh_tag": "Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.57:8208",
	"elpais_id": "CYM",
	"elpais_nombre": "Crimen + Investigación",
	"elpais_numero": "78",
	"tvh_id": "CYM.es",
	"tvh_m3u": false,
	"tvh_nombre": "Crimen & Investigación",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.65:8208",
	"elpais_id": "CCTV-E",
	"elpais_nombre": "CCTV Español",
	"elpais_numero": "79",
	"tvh_id": "CCTV-E.es",
	"tvh_m3u": false,
	"tvh_nombre": "CCTV Español",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.27:8208",
	"elpais_id": "CACOC",
	"elpais_nombre": "Canal Cocina",
	"elpais_numero": "80",
	"tvh_categoria": "Arts / Culture (without music)",
	"tvh_id": "CACOC.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal Cocina",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.71:8208",
	"elpais_id": "DECASA",
	"elpais_nombre": "Canal Decasa",
	"elpais_numero": "81",
	"tvh_id": "DECASA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal Decasa",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": true,
	"elpais_fuente": "239.123.123.200:58200",
	"elpais_id": "892",
	"elpais_nombre": "DKISS",
	"elpais_numero": "82",
	"tvh_id": "DKISS.es",
	"tvh_m3u": false,
	"tvh_nombre": "DKISS",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.154:58154",
	"elpais_id": "DIVINI",
	"elpais_nombre": "Divinity",
	"elpais_numero": "83",
	"tvh_id": "DIVINI.es",
	"tvh_m3u": false,
	"tvh_nombre": "Divinity",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.150:58150",
	"elpais_id": "NOVA",
	"elpais_nombre": "Nova",
	"elpais_numero": "84",
	"tvh_id": "NOVA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Nova",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.31:8208",
	"elpais_id": "MEGA",
	"elpais_nombre": "Mega",
	"elpais_numero": "85",
	"tvh_id": "MEGA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Mega",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": true,
	"elpais_fuente": "239.123.123.169:58169",
	"elpais_id": "890",
	"elpais_nombre": "BE MAD",
	"elpais_numero": "86",
	"tvh_id": "BEMAD.es",
	"tvh_m3u": false,
	"tvh_nombre": "BEMAD HD",
	"tvh_tag": "Canales HD"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.99:8208",
	"elpais_id": "GARAGE",
	"elpais_nombre": "Garage TV",
	"elpais_numero": "87",
	"tvh_id": "GARAGE.es",
	"tvh_m3u": false,
	"tvh_nombre": "Garage TV",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.45:8208",
	"elpais_id": "ORBE21",
	"elpais_nombre": "Canal Orbe 21",
	"elpais_numero": "88",
	"tvh_id": "ORBE21.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal Orbe 21",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.114:1234",
	"elpais_id": "BABY",
	"elpais_nombre": "Baby TV",
	"elpais_numero": "90",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "BABY.es",
	"tvh_m3u": false,
	"tvh_nombre": "Baby TV",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.??:1234",
	"elpais_id": "PLAYDC",
	"elpais_nombre": "Disney Junior",
	"elpais_numero": "91",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "PLAYDC.es",
	"tvh_m3u": false,
	"tvh_nombre": "Disney Junior",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.117:8208",
	"elpais_id": "PANDA",
	"elpais_nombre": "Canal Panda",
	"elpais_numero": "92",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "PANDA.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal Panda",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.130:1234",
	"elpais_id": "NICKJR",
	"elpais_nombre": "NICK JR",
	"elpais_numero": "93",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "NICKJR.es",
	"tvh_m3u": false,
	"tvh_nombre": "Nick Jr",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "231.0.0.131:1234",
	"elpais_id": "NICK",
	"elpais_nombre": "Nickelodeon",
	"elpais_numero": "94",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "NICK.es",
	"tvh_m3u": false,
	"tvh_nombre": "Nickelodeon",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.11:8208",
	"elpais_id": "DCHXD",
	"elpais_nombre": "Disney XD",
	"elpais_numero": "95",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "DCHXD.es",
	"tvh_m3u": false,
	"tvh_nombre": "Disney XD",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.157:58157",
	"elpais_id": "DCH",
	"elpais_nombre": "Disney Channel",
	"elpais_numero": "96",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "DCH.es",
	"tvh_m3u": false,
	"tvh_nombre": "Disney Channel",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.167:58167",
	"elpais_id": "BOING",
	"elpais_nombre": "Boing",
	"elpais_numero": "97",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "BOING.es",
	"tvh_m3u": false,
	"tvh_nombre": "Boing",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.123.123.164:58164",
	"elpais_id": "CLANTV",
	"elpais_nombre": "Clan TVE",
	"elpais_numero": "98",
	"tvh_categoria": "Children's / Youth programs",
	"tvh_id": "CLANTV.es",
	"tvh_m3u": false,
	"tvh_nombre": "Clan TVE",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.12:8208",
	"elpais_id": "40TV",
	"elpais_nombre": "Los40",
	"elpais_numero": "103",
	"tvh_categoria": "Music / Ballet / Dance",
	"tvh_id": "Los40.es",
	"tvh_m3u": false,
	"tvh_nombre": "Los40",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.75:8208",
	"elpais_id": "VH1",
	"elpais_nombre": "VH1",
	"elpais_numero": "105",
	"tvh_categoria": "Music / Ballet / Dance",
	"tvh_id": "VH1.es",
	"tvh_m3u": false,
	"tvh_nombre": "VH1",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.4.65:8208",
	"elpais_id": "MEZZO",
	"elpais_nombre": "Mezzo",
	"elpais_numero": "107",
	"tvh_categoria": "Music / Ballet / Dance",
	"tvh_id": "MEZZO.es",
	"tvh_m3u": false,
	"tvh_nombre": "Mezzo HD",
	"tvh_tag": ""
},
{
	"elpais_epg": false,
	"elpais_fuente": "39.0.9.137:8208",
	"elpais_id": "CLASSI",
	"elpais_nombre": "Classica HD",
	"elpais_numero": "109",
	"tvh_categoria": "Music / Ballet / Dance",
	"tvh_id": "CLASSI.es",
	"tvh_m3u": false,
	"tvh_nombre": "Classica HD",
	"tvh_tag": "Canales HD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.78:8208",
	"elpais_id": "24H",
	"elpais_nombre": "24 Horas",
	"elpais_numero": "112",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "24H.es",
	"tvh_m3u": false,
	"tvh_nombre": "24 Horas",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.30:8208",
	"elpais_id": "BBC",
	"elpais_nombre": "BBC World",
	"elpais_numero": "113",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "BBC.es",
	"tvh_m3u": false,
	"tvh_nombre": "BBC World News",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.40:8208",
	"elpais_id": "CNN",
	"elpais_nombre": "CNN Int",
	"elpais_numero": "114",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "CNN.es",
	"tvh_m3u": false,
	"tvh_nombre": "CNN International",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.65:8208",
	"elpais_id": "FOXNWS",
	"elpais_nombre": "Fox News",
	"elpais_numero": "115",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "FOXNWS.es",
	"tvh_m3u": false,
	"tvh_nombre": "FOX News",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.28:8208",
	"elpais_id": "ENW",
	"elpais_nombre": "Euronews",
	"elpais_numero": "116",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "ENW.es",
	"tvh_m3u": false,
	"tvh_nombre": "Euronews",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.66:8208",
	"elpais_id": "ALJAZE",
	"elpais_nombre": "Al Jazeera",
	"elpais_numero": "117",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "ALJAZE.es",
	"tvh_m3u": false,
	"tvh_nombre": "Al Jazeera",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.67:8208",
	"elpais_id": "FRA EN",
	"elpais_nombre": "FRANCE 24",
	"elpais_numero": "118",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "FRA.EN.es",
	"tvh_m3u": false,
	"tvh_nombre": "France 24",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.67:8208",
	"elpais_id": "RTESP",
	"elpais_nombre": "RT Español",
	"elpais_numero": "119",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "RTESP.es",
	"tvh_m3u": false,
	"tvh_nombre": "RT Español",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.69:8208",
	"elpais_id": "NBC",
	"elpais_nombre": "CNBC",
	"elpais_numero": "120",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "NBC.es",
	"tvh_m3u": false,
	"tvh_nombre": "CNBC Europe",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.31:8208",
	"elpais_id": "TV5",
	"elpais_nombre": "TV5MONDE",
	"elpais_numero": "122",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "TV5.es",
	"tvh_m3u": false,
	"tvh_nombre": "TV5MONDE",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.29:8208",
	"elpais_id": "BL",
	"elpais_nombre": "Bloomberg",
	"elpais_numero": "123",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "BL.es",
	"tvh_m3u": false,
	"tvh_nombre": "Bloomberg",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.63:8208",
	"elpais_id": "INTECO",
	"elpais_nombre": "Intereconomía TV",
	"elpais_numero": "124",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "INTECO.es",
	"tvh_m3u": false,
	"tvh_nombre": "Intereconomía TV",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.85:8208",
	"elpais_id": "LIBDIG",
	"elpais_nombre": "Libertad Digital",
	"elpais_numero": "125",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "LIBDIG.es",
	"tvh_m3u": false,
	"tvh_nombre": "Libertad Digital",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.220:8208",
	"elpais_id": "312",
	"elpais_nombre": "i24news",
	"elpais_numero": "128",
	"tvh_categoria": "News / Current affairs",
	"tvh_id": "312.es",
	"tvh_m3u": false,
	"tvh_nombre": "i24news",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.221:8208",
	"elpais_id": "CNCWOR",
	"elpais_nombre": "CNC World",
	"elpais_numero": "129",
	"tvh_id": "CNCWOR.es",
	"tvh_m3u": false,
	"tvh_nombre": "CNC World",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.3:8208",
	"elpais_id": "TELEFE",
	"elpais_nombre": "Telefe Internacional",
	"elpais_numero": "134",
	"tvh_id": "TELEFE.es",
	"tvh_m3u": false,
	"tvh_nombre": "Telefe Internacional",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.193:8208",
	"elpais_id": "GALAV",
	"elpais_nombre": "Canal de las Estrellas",
	"elpais_numero": "135",
	"tvh_id": "GALAV.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal de las Estrellas",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.129:8208",
	"elpais_id": "CARACO",
	"elpais_nombre": "Caracol TV",
	"elpais_numero": "136",
	"tvh_id": "CARACO.es",
	"tvh_m3u": false,
	"tvh_nombre": "Caracol TV",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.2:8208",
	"elpais_id": "TVREC",
	"elpais_nombre": "TV RECORD",
	"elpais_numero": "137",
	"tvh_id": "TVREC.es",
	"tvh_m3u": false,
	"tvh_nombre": "TV Record",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.1:8208",
	"elpais_id": "CHILE",
	"elpais_nombre": "TV Chile",
	"elpais_numero": "138",
	"tvh_id": "CHILE.es",
	"tvh_m3u": false,
	"tvh_nombre": "TV Chile",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.7.131:8208",
	"elpais_id": "COLOMB",
	"elpais_nombre": "TV Colombia",
	"elpais_numero": "139",
	"tvh_id": "COLOMB.es",
	"tvh_m3u": false,
	"tvh_nombre": "TV Colombia",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.68:8208",
	"elpais_id": "AZMUND",
	"elpais_nombre": "AZ Mundo",
	"elpais_numero": "140",
	"tvh_id": "AZMUND.es",
	"tvh_m3u": false,
	"tvh_nombre": "AZ Mundo",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.67:8208",
	"elpais_id": "CUBAV",
	"elpais_nombre": "Cubavisión",
	"elpais_numero": "141",
	"tvh_id": "CUBAV.es",
	"tvh_m3u": false,
	"tvh_nombre": "Cubavisión",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.8.69:8208",
	"elpais_id": "TLESUR",
	"elpais_nombre": "Telesur",
	"elpais_numero": "142",
	"tvh_id": "TLESUR.es",
	"tvh_m3u": false,
	"tvh_nombre": "Telesur",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.1:8208",
	"elpais_id": "ANTV",
	"elpais_nombre": "Canal Sur Andalucía",
	"elpais_numero": "150",
	"tvh_id": "ANTV.es",
	"tvh_m3u": false,
	"tvh_nombre": "Canal Sur Andalucía",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.37:8208",
	"elpais_id": "TVG",
	"elpais_nombre": "TV Galicia",
	"elpais_numero": "151",
	"tvh_id": "TVG.es",
	"tvh_m3u": false,
	"tvh_nombre": "TV Galicia",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.3.36:8208",
	"elpais_id": "TVC",
	"elpais_nombre": "TV3 Cat",
	"elpais_numero": "153",
	"tvh_id": "TVC.es",
	"tvh_m3u": false,
	"tvh_nombre": "TV3 Cat",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.60:8208",
	"elpais_id": "ETB",
	"elpais_nombre": "ETB Sat",
	"elpais_numero": "154",
	"tvh_id": "ETB.es",
	"tvh_m3u": false,
	"tvh_nombre": "ETB Sat",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.0.0.81:8208",
	"elpais_id": "ARAGON",
	"elpais_nombre": "Aragón TV Int",
	"elpais_numero": "155",
	"tvh_id": "ARAGON.es",
	"tvh_m3u": false,
	"tvh_nombre": "Aragón TV Int",
	"tvh_tag": "SD|Favoritos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.120.5.251:8208",
	"elpais_id": "MDISNE",
	"elpais_nombre": "M. Disney",
	"elpais_numero": "109",
	"tvh_id": "MDISNE.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais Disney",
	"tvh_tag": "Dibujos"
},
{
	"elpais_epg": false,
	"elpais_fuente": "239.120.5.250:8208",
	"elpais_id": "ESPORT",
	"elpais_nombre": "M. eSports",
	"elpais_numero": "62",
	"tvh_id": "ESPORT.es",
	"tvh_m3u": false,
	"tvh_nombre": "elpais eSports",
	"tvh_tag": ""
}
];


export default cadenasFavoritos;

