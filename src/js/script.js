const getData = async (url)=> {
    const resp = await fetch(url)
    const data = await resp.json()
    return data
}

const getMany = async (url, num) => {
    data = await getData(url)
    let filterData = []
    for(let i = 0; i < num; i++){
        filterData.push(data[i])
    }
    return filterData
}


const addValue = (element, value)=>{
    element.innerHTML += value
}

const setValue = (element, value)=>{
    element.innerHTML = value
}

//Country selector
const countrySelector = document.getElementById("country-selector")

//Tabs Tracker 1
const totalCases = document.getElementById("total-cases")
const totalDeaths = document.getElementById("total-cases")
const totalRecovered = document.getElementById("total-cases")
const totalActive = document.getElementById("total-cases")
const newCases = document.getElementById("total-cases")
const newDeaths = document.getElementById("total-cases")



//Components

const option = (country) => {
    let element = `<option id=${country.toLowerCase()}>${country}</option>`
    return element
}

const countryButton = (country, flag) => {
    let element = `<div class="country-button">
    <img class="button-flag" src=${flag} alt="" />
    <span class="button-text">${country}</span>
    </div>`
    return element
}



const domPaint = async () => {
    let data = await getData('https://disease.sh/v3/covid-19/all')
    let countries = await getData('https://disease.sh/v3/covid-19/countries')
    let topTen = await getMany('https://disease.sh/v3/covid-19/countries?sort=cases', 10)

    countries.forEach(country => {
        console.log(country)
        addValue(countrySelector, option(country.country))
    })
}

domPaint() 

