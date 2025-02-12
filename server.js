// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Lookup object met 3 letter-code en 2 letter-code equivalent
const countries = {'AFG':'AF', 'ALB':'AL', 'DZA':'DZ', 'ASM':'AS', 'AND':'AD', 'AGO':'AO', 'AIA':'AI', 'ATA':'AQ', 'ATG':'AG', 'ARG':'AR', 'ARM':'AM', 'ABW':'AW', 'AUS':'AU', 'AUT':'AT', 'AZE':'AZ', 'BHS':'BS', 'BHR':'BH', 'BGD':'BD', 'BRB':'BB', 'BLR':'BY', 'BEL':'BE', 'BLZ':'BZ', 'BEN':'BJ', 'BMU':'BM', 'BTN':'BT', 'BOL':'BO', 'BES':'BQ', 'BIH':'BA', 'BWA':'BW', 'BVT':'BV', 'BRA':'BR', 'IOT':'IO', 'BRN':'BN', 'BGR':'BG', 'BFA':'BF', 'BDI':'BI', 'CPV':'CV', 'KHM':'KH', 'CMR':'CM', 'CAN':'CA', 'CYM':'KY', 'CAF':'CF', 'TCD':'TD', 'CHL':'CL', 'CHN':'CN', 'CXR':'CX', 'CCK':'CC', 'COL':'CO', 'COM':'KM', 'COD':'CD', 'COG':'CG', 'COK':'CK', 'CRI':'CR', 'HRV':'HR', 'CUB':'CU', 'CUW':'CW', 'CYP':'CY', 'CZE':'CZ', 'CIV':'CI', 'DNK':'DK', 'DJI':'DJ', 'DMA':'DM', 'DOM':'DO', 'ECU':'EC', 'EGY':'EG', 'SLV':'SV', 'GNQ':'GQ', 'ERI':'ER', 'EST':'EE', 'SWZ':'SZ', 'ETH':'ET', 'FLK':'FK', 'FRO':'FO', 'FJI':'FJ', 'FIN':'FI', 'FRA':'FR', 'GUF':'GF', 'PYF':'PF', 'ATF':'TF', 'GAB':'GA', 'GMB':'GM', 'GEO':'GE', 'DEU':'DE', 'GHA':'GH', 'GIB':'GI', 'GRC':'GR', 'GRL':'GL', 'GRD':'GD', 'GLP':'GP', 'GUM':'GU', 'GTM':'GT', 'GGY':'GG', 'GIN':'GN', 'GNB':'GW', 'GUY':'GY', 'HTI':'HT', 'HMD':'HM', 'VAT':'VA', 'HND':'HN', 'HKG':'HK', 'HUN':'HU', 'ISL':'IS', 'IND':'IN', 'IDN':'ID', 'IRN':'IR', 'IRQ':'IQ', 'IRL':'IE', 'IMN':'IM', 'ISR':'IL', 'ITA':'IT', 'JAM':'JM', 'JPN':'JP', 'JEY':'JE', 'JOR':'JO', 'KAZ':'KZ', 'KEN':'KE', 'KIR':'KI', 'PRK':'KP', 'KOR':'KR', 'KWT':'KW', 'KGZ':'KG', 'LAO':'LA', 'LVA':'LV', 'LBN':'LB', 'LSO':'LS', 'LBR':'LR', 'LBY':'LY', 'LIE':'LI', 'LTU':'LT', 'LUX':'LU', 'MAC':'MO', 'MDG':'MG', 'MWI':'MW', 'MYS':'MY', 'MDV':'MV', 'MLI':'ML', 'MLT':'MT', 'MHL':'MH', 'MTQ':'MQ', 'MRT':'MR', 'MUS':'MU', 'MYT':'YT', 'MEX':'MX', 'FSM':'FM', 'MDA':'MD', 'MCO':'MC', 'MNG':'MN', 'MNE':'ME', 'MSR':'MS', 'MAR':'MA', 'MOZ':'MZ', 'MMR':'MM', 'NAM':'NA', 'NRU':'NR', 'NPL':'NP', 'NLD':'NL', 'NCL':'NC', 'NZL':'NZ', 'NIC':'NI', 'NER':'NE', 'NGA':'NG', 'NIU':'NU', 'NFK':'NF', 'MNP':'MP', 'NOR':'NO', 'OMN':'OM', 'PAK':'PK', 'PLW':'PW', 'PSE':'PS', 'PAN':'PA', 'PNG':'PG', 'PRY':'PY', 'PER':'PE', 'PHL':'PH', 'PCN':'PN', 'POL':'PL', 'PRT':'PT', 'PRI':'PR', 'QAT':'QA', 'MKD':'MK', 'ROU':'RO', 'RUS':'RU', 'RWA':'RW', 'REU':'RE', 'BLM':'BL', 'SHN':'SH', 'KNA':'KN', 'LCA':'LC', 'MAF':'MF', 'SPM':'PM', 'VCT':'VC', 'WSM':'WS', 'SMR':'SM', 'STP':'ST', 'SAU':'SA', 'SEN':'SN', 'SRB':'RS', 'SYC':'SC', 'SLE':'SL', 'SGP':'SG', 'SXM':'SX', 'SVK':'SK', 'SVN':'SI', 'SLB':'SB', 'SOM':'SO', 'ZAF':'ZA', 'SGS':'GS', 'SSD':'SS', 'ESP':'ES', 'LKA':'LK', 'SDN':'SD', 'SUR':'SR', 'SJM':'SJ', 'SWE':'SE', 'CHE':'CH', 'SYR':'SY', 'TWN':'TW', 'TJK':'TJ', 'TZA':'TZ', 'THA':'TH', 'TLS':'TL', 'TGO':'TG', 'TKL':'TK', 'TON':'TO', 'TTO':'TT', 'TUN':'TN', 'TUR':'TR', 'TKM':'TM', 'TCA':'TC', 'TUV':'TV', 'UGA':'UG', 'UKR':'UA', 'ARE':'AE', 'GBR':'GB', 'UMI':'UM', 'USA':'US', 'URY':'UY', 'UZB':'UZ', 'VUT':'VU', 'VEN':'VE', 'VNM':'VN', 'VGB':'VG', 'VIR':'VI', 'WLF':'WF', 'ESH':'EH', 'YEM':'YE', 'ZMB':'ZM', 'ZWE':'ZW', 'ALA':'AX'};

// Je kunt de volgende URLs uit onze API gebruiken:
// - https://fdnd.directus.app/items/tribe
// - https://fdnd.directus.app/items/squad
// - https://fdnd.directus.app/items/person
// En combineren met verschillende query parameters als filter, sort, search, etc.
// Gebruik hiervoor de documentatie van https://directus.io/docs/guides/connect/query-parameters
// En de oefeningen uit https://github.com/fdnd-task/connect-your-tribe-squad-page/blob/main/docs/squad-page-ontwerpen.md

// Haal alle eerstejaars squads uit de WHOIS API op van dit jaar (2024–2025)
const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
const squadResponseJSON = await squadResponse.json()

// Controleer de data in je console (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(squadResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))


// Om Views weer te geven, heb je Routes nodig
// Maak een GET route voor de index
app.get('/', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=name,fav_country&filter[fav_country][_neq]=null')

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  // Je zou dat hier kunnen filteren, sorteren, of zelfs aanpassen, voordat je het doorgeeft aan de view
  
  personResponseJSON.data.map(function(person){
    person.fav_country_for_map = countries[person.fav_country] 
  })

  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('index.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data})
})

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, '/')
})

app.get('/country/:countryCode', async function (request, response) {
  // Haal alle personen uit de WHOIS API op, van dit jaar
  // make countrycode capitals again
  const code = request.params.countryCode.toUpperCase()
  // const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=name,fav_country&filter[fav_country][_eq]=esp'+code)
  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=name,fav_country&filter[fav_country][_eq]='+code)

  
  console.log('https://fdnd.directus.app/items/person/?fields=name,fav_country&filter[fav_country][_eq]='+code);
  

  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  // personResponseJSON bevat gegevens van alle personen uit alle squads van dit jaar
  
  // Render index.liquid uit de views map en geef de opgehaalde data mee als variabele, genaamd persons
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('people.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data})
})








// Maak een GET route voor een detailpagina met een route parameter, id
// Zie de documentatie van Express voor meer info: https://expressjs.com/en/guide/routing.html#route-parameters
app.get('/europe/:id', async function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  const personDetailResponse = await fetch('https://fdnd.directus.app/items/person/' + request.params.id)
  // En haal daarvan de JSON op
  const personDetailResponseJSON = await personDetailResponse.json()
  
  // Render student.liquid uit de views map en geef de opgehaalde data mee als variable, genaamd person
  // Geef ook de eerder opgehaalde squad data mee aan de view
  response.render('europe.liquid', {person: personDetailResponseJSON.data, squads: squadResponseJSON.data})
})



// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})