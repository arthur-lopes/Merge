const google = require('googleapis').google
const customSearch = google.customsearch('v1')

const googleSearchCredentials = require('../credentials/google-search.json')

async function robot(content) {

    const placesArray = await fetchGoogleAndReturnPlacesInfo('Restaurante Volta Redonda')
    console.dir(placesArray, {depth: null})
    process.exit(0)

async function fetchGoogleAndReturnPlacesInfo(query) {
    const response = await customSearch.cse.list({
        auth: googleSearchCredentials.apiKey,
        cx: googleSearchCredentials.searchEngineId,
        q: query,
        num: 10,
        start: 1
    })

    const placesInfo = response.data.items.map((item) => {
        return [ item.title, item.link, item.snippet ]
    })
    
    return placesInfo
}
}

module.exports = robot