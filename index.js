const readline = require('readline-sync')
const robots = {
    text: require ('./robots/text.js')
}

async function start() {
    const content = {}

    content.searchCity = askAndReturnSearchCity()
    content.searchBusiness = askAndReturnSearchBusiness()

    await robots.text(content)


    // Pergunta pelo termo de busca e retorna a busca
    function askAndReturnSearchCity() {
        return readline.question('Digite uma cidade: ')
    }
    function askAndReturnSearchBusiness() {
        return readline.question('Digite um tipo de negócio: ')
    }
    console.log(content)
}

start()