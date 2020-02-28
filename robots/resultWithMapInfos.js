const google = require('googleapis').google
const customSearch = google.customsearch('v1')

const googleSearchCredentials = require('../credentials/google-search.json')

async function robot(content) {
    const contentSearchBusiness = content.searchBusiness 
    const contentSearchCity = content.searchCity
    const query = contentSearchBusiness + ' ' + contentSearchCity

    const placesArray = await fetchGoogleAndReturnPlacesInfo(query)
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

    const totalResults = response.data.searchInformation.totalResults

    const placesInfo = response.data.items.map((item) => {
        return [ 
            item.title,
            item.link,
            item.snippet,
            item.pagemap.metatags,
            item.pagemap.aggregaterating
         ]
    })
    
    return placesInfo
}
}

module.exports = robot