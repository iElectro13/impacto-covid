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
const totalDeaths = document.getElementById("total-deaths")
const totalRecovered = document.getElementById("total-recovered")
const totalActive = document.getElementById("total-active")
const newCases = document.getElementById("new-cases")
const newDeaths = document.getElementById("new-deaths")



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
        addValue(countrySelector, option(country.country))
    })

    countrySelector.addEventListener("change", ()=>{
        const setTabs = async()=>{
            let selectedCountry = await getData(`https://disease.sh/v3/covid-19/countries/${countrySelector.selectedOptions[0].text.toLowerCase()}`)
            totalCases.childNodes[3].innerHTML = selectedCountry.cases
            totalDeaths.childNodes[3].innerHTML = selectedCountry.deaths
            totalRecovered.childNodes[3].innerHTML = selectedCountry.recovered
            totalActive.childNodes[3].innerHTML = selectedCountry.active
            newCases.childNodes[3].innerHTML = selectedCountry.todayCases
            newDeaths.childNodes[3].innerHTML = selectedCountry.todayDeaths

            
        }
        setTabs()
    })
}

domPaint() 

