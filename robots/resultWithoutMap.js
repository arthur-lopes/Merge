const google = require('googleapis').google
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../credentials/google-search.json')

async function robot() {
        const response = await customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: 'Restaurante Volta Redonda',
            num: 10
        })

        console.dir(response, {depth: null})
        process.exit(0)
}

module.exports = robot
