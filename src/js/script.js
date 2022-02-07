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

//tabs tracker 5
const totalCasesTrakerFive = document.getElementById("total-cases-tracker5"),
    totalDeathsTrakerFive = document.getElementById("total-deaths-tracker5"),
    totalRecoveredTrakerFive = document.getElementById("total-recovered-tracker5"),
    totalActiveTrakerFive = document.getElementById("total-active-tracker5"),
    newCasesTrakerFive = document.getElementById("new-cases-tracker5"),
    newDeathsTrakerFive = document.getElementById("new-deaths-tracker5")

//Tabs main tracker 
const tracker1 = document.querySelector('.tracker-number1'),
    tracker2 = document.querySelector('.tracker-number2'),
    tracker3 = document.querySelector('.tracker-number3'),
    tracker4 = document.querySelector('.tracker-number4')
    flagSection = document.querySelector('.flag-section')


//Tabs tracker4

const topCasesContainer = document.getElementById('top-cases'),
    todayCasesContainer = document.getElementById('today-cases'),
    topDeathsContainer = document.getElementById('top-deaths'),
    todayDeathsContainer = document.getElementById('today-deaths'),
    topActiveContainer = document.getElementById('top-active'),
    topRecoveredContainer = document.getElementById('top-recovered')

//Tracker pages
const trackerPages = document.querySelectorAll('.tracker-page')

const trackerPage2 = document.getElementById('tracker-page2'),
    trackerPage3 = document.getElementById('tracker-page3'),
    trackerPage4 = document.getElementById('tracker-page4'),
    trackerPage5 = document.getElementById('tracker-page5')

//Icons
const icons = document.querySelectorAll('.icons')
const iconsSvg = document.querySelectorAll('.icons-svg')

const tracker2Icon = document.getElementById('tracker2-icon'),
tracker3Icon = document.getElementById('tracker3-icon'),
tracker4Icon = document.getElementById('tracker4-icon'),
tracker5Icon = document.getElementById('tracker5-icon')


//Table
const tBody = document.getElementById('table-body')

//wise tabs container 
const wiseTabContainer = document.querySelector('.track')

/*-----------Components----------*/
//Option
const option = (country) => {
    let element = `<option id=${country.toLowerCase()}>${country}</option>`
    return element
}

const topTenTab = (flag, country, number)=>{
    let element = `
    <div class="card">
    <div class="info-country">

    <picture class="foto"><img src=${flag} alt=""></picture>
    <span>${country}</span>
    </div>
    <span>${number}</span>
    </div>`
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

//Table Row
const tableR = (flag, country, cases, newCases, deaths, newDeaths, recovered, active, critical, tested) => {
    let element = `
    <tr>
        <td><img class="table-img" src=${flag} alt=""></td>
        <td>${country}</td>
        <td>${cases}</td>
        <td>${newCases}</td>
        <td>${deaths}</td>
        <td>${newDeaths}</td>
        <td>${recovered}</td>
        <td>${active}</td>
        <td>${critical}4</td>
        <td>${tested}</td>
    </tr>`
    return element
}

//Wise-tabs
const wiseTab = (flag, country) => {
    let element = `
    <div class="${country} tarjeta">
    <picture class="${country} foto"><img class=${country} src=${flag} alt=""></picture>
    <p class=${country}>${country}</p>
    </div>`
    return element
}



/*----------This functions handles the initial DOM load and sets all the data--------*/
const domPaint = async () => {
    let data = await getData('https://disease.sh/v3/covid-19/all')
    let countries = await getData('https://disease.sh/v3/covid-19/countries')
    let topTen = await getMany('https://disease.sh/v3/covid-19/countries?sort=cases', 10)
    let topToday = await getMany('https://disease.sh/v3/covid-19/countries?sort=todayCases', 10)
    let topDeaths = await getMany('https://disease.sh/v3/covid-19/countries?sort=deaths', 10)
    let topTodayDeaths = await getMany('https://disease.sh/v3/covid-19/countries?sort=todayDeaths', 10)
    let topActive = await getMany('https://disease.sh/v3/covid-19/countries?sort=active', 10)
    let topRecovered = await getMany('https://disease.sh/v3/covid-19/countries?sort=recovered', 10)





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

    //Set top 10 in tracker 4

    topTen.forEach(element => {
        addValue(topCasesContainer, topTenTab(element.countryInfo.flag, element.country, element.cases))
    })
    topToday.forEach(element => {
        addValue(todayCasesContainer, topTenTab(element.countryInfo.flag, element.country, element.todayCases))
    })
    topDeaths.forEach(element => {
        addValue(topDeathsContainer, topTenTab(element.countryInfo.flag, element.country, element.deaths))
    })
    topTodayDeaths.forEach(element => {
        addValue(todayDeathsContainer, topTenTab(element.countryInfo.flag, element.country, element.todayDeaths))
    })
    topRecovered.forEach(element => {
        addValue(topRecoveredContainer, topTenTab(element.countryInfo.flag, element.country, element.recovered))
    })
    topActive.forEach(element => {
        addValue(topActiveContainer, topTenTab(element.countryInfo.flag, element.country, element.active))
    })


    //Set table
    countries.forEach(country => {
        addValue(tBody, tableR(country.countryInfo.flag, country.country, country.cases, country.todayCases, country.deaths, country.todayDeaths, country.recovered, country.active, country.critical, country.tests))

    })
    $(document).ready( function () {
        $('#table').DataTable();
    } );


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

    //Set wise-tabs
    topTen.forEach(country => {
        addValue(wiseTabContainer, wiseTab(country.countryInfo.flag, country.country))
    })

    wiseTabContainer.addEventListener('click', (e)=>{
        let wiseTabs = document.querySelectorAll('.tarjeta')
        const setCards = async()=>{
            let selectedCountry = await getData(`https://disease.sh/v3/covid-19/countries/${e.target.classList[0]}`)
            totalCasesTrakerFive.childNodes[3].innerHTML = selectedCountry.cases
            totalDeathsTrakerFive.childNodes[3].innerHTML = selectedCountry.deaths
            totalRecoveredTrakerFive.childNodes[3].innerHTML = selectedCountry.recovered
            totalActiveTrakerFive.childNodes[3].innerHTML = selectedCountry.active
            newCasesTrakerFive.childNodes[3].innerHTML = selectedCountry.todayCases
            newDeathsTrakerFive.childNodes[3].innerHTML = selectedCountry.todayDeaths
        }
        if(e.target.nodeName == 'DIV' && e.target.classList[1] == 'tarjeta'){
            wiseTabs.forEach(element =>{
                element.classList.remove('active')
            })
            e.target.classList.add('active')
            setCards()

        } else if(e.target.nodeName != 'DIV'){
            wiseTabs.forEach(element =>{
                element.classList.remove('active')
            })
            e.target.parentNode.classList.add('active')
            setCards()

        }
        

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
    tracker5Icon.addEventListener('click', ()=> {
        trackerPages.forEach(tracker => {
            tracker.classList.add('inactive')
        })
        trackerPage5.classList.remove('inactive')
    })
    domPaint()
})