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

    totalResults = response.data.searchInformation.totalResults
    const calcResults = Math.floor(totalResults/10)
    let placesAllInfo = []

    for (i=1; i < calcResults; i=i+10) {
    try {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            num: 10,
            start: i
    })
    placesInfo = response.data.items.map((item) => {
        return [ 
            item.title,
            item.link,
            item.snippet,
            item.pagemap.metatags,
            item.pagemap.aggregaterating
         ]
    })
    placesAllInfo.push(...placesInfo)
    // console.log(placesAllInfo)
    } catch (error) {
            break
    }
}
return placesAllInfo
}
}

module.exports = robot