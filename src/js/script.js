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


const removeActive = (array) => {
    array.forEach(element => {
        element.classList.remove('active')
    })
}

//Country selector
const countrySelector = document.getElementById("country-selector")

//Tabs Tracker 1
const totalCases = document.getElementById("total-cases"),
    totalDeaths = document.getElementById("total-deaths"),
    totalRecovered = document.getElementById("total-recovered"),
    totalActive = document.getElementById("total-active"),
    newCases = document.getElementById("new-cases"),
    newDeaths = document.getElementById("new-deaths")

//Tabs main tracker 
const tracker1 = document.querySelector('.tracker-number1'),
    tracker2 = document.querySelector('.tracker-number2'),
    tracker3 = document.querySelector('.tracker-number3'),
    tracker4 = document.querySelector('.tracker-number4')
    flagSection = document.querySelector('.flag-section')

//Tracker pages
const trackerPages = document.querySelectorAll('.tracker-page')

const trackerPage2 = document.getElementById('tracker-page2'),
    trackerPage3 = document.getElementById('tracker-page3'),
    trackerPage4 = document.getElementById('tracker-page4')

//Icons
const icons = document.querySelectorAll('.icons')
const iconsSvg = document.querySelectorAll('.icons-svg')

const tracker2Icon = document.getElementById('tracker2-icon'),
tracker3Icon = document.getElementById('tracker3-icon'),
tracker4Icon = document.getElementById('tracker4-icon')


/*-----------Components----------*/
//Option
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

//Top ten item
const topTenItem = (flag, country, cases)=> {
    let element = `<div class="section2content">
    <div class="text-flag-content">
        <img class="section2contentFlag" src=${flag} alt="Bandera">
        <span class="section2contentText">${country}</span>
    </div>
    <span class="section2contentNumber">${cases}</span>
</div>`
    return element
}


/*----------This functions handles the initial DOM load and sets all the data--------*/
const domPaint = async () => {
    let data = await getData('https://disease.sh/v3/covid-19/all')
    let countries = await getData('https://disease.sh/v3/covid-19/countries')
    let topTen = await getMany('https://disease.sh/v3/covid-19/countries?sort=cases', 10)


    //Navbar 

    icons.forEach(icon => {
        icon.addEventListener('click', ()=>{
            removeActive(iconsSvg)
            icon.childNodes[1].classList.add('active')

        })
    })

    


    //Set top 10

    topTen.forEach(element => {
        addValue(flagSection, topTenItem(element.countryInfo.flag, element.country, element.cases))
    })


    //Set main trackers
    tracker1.innerHTML = data.cases
    tracker2.innerHTML = data.active
    tracker3.innerHTML = data.recovered
    tracker4.innerHTML = data.deaths

    // Set select bar
    countries.forEach(country => {
        addValue(countrySelector, option(country.country))
    })
    //Set tracker page 1
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


window.addEventListener('DOMContentLoaded', ()=> {
    tracker2Icon.addEventListener('click', ()=>{
        trackerPages.forEach(tracker =>{
            tracker.classList.add('inactive')
        })
        trackerPage2.classList.remove('inactive')
    })
    tracker3Icon.addEventListener('click', ()=>{
        trackerPages.forEach(tracker =>{
            tracker.classList.add('inactive')
        })
        trackerPage3.classList.remove('inactive')
    })
    tracker4Icon.addEventListener('click', ()=>{
        trackerPages.forEach(tracker =>{
            tracker.classList.add('inactive')
        })
        trackerPage4.classList.remove('inactive')
    })
    domPaint()
})

