//Global Variable Declarations & Document Body Element Creations
let monsterContainer = document.querySelector('#monster-container')
const createMonster = document.querySelector('#create-monster')

let currentPage = 1
let pageLimit = 50

const monsterForm = document.createElement('form')

const nameInput = document.createElement('input')
nameInput.id = 'name'
nameInput.placeholder = 'name...'

const ageInput = document.createElement('input')
ageInput.id = 'age'
ageInput.placeholder = 'age...'

const bioInput = document.createElement('input')
bioInput.id = 'description'
bioInput.placeholder = 'description...'

const monsterBtn = document.createElement('button')
monsterBtn.innerText = 'Create'

monsterForm.append(nameInput, ageInput, bioInput, monsterBtn)

createMonster.append(monsterForm)

const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')

const button = document.querySelector('button')
///////////////////////////////////////////////////////////////////

//Add Event Listener to form button////////////////////////////////
button.addEventListener('click', evt => {
    evt.preventDefault()
    let form = evt.target.parentElement
    let monsterName = form.name.value
    let monsterAge = form.age.value
    let monsterBio = form.description.value

    //POST fetch to create a new monster/////////
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: monsterName,
            age: monsterAge,
            description: monsterBio
        })
    })
    .then(resp => resp.json())
    .then(createMonsterCard)
})

//Display current API data on the DOM//////////////////////////////////////
fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
.then(resp => resp.json())
.then(respJSON => respJSON.forEach(createMonsterCard))

//Created function for displaying API data/////////////////////////////////
function createMonsterCard(obj){
    let monsterContainer = document.querySelector('#monster-container')

    let h2 = document.createElement('h2')
    h2.innerText = obj.name
    
    let h4 = document.createElement('h4')
    h4.innerText = `Age: ${obj.age}`
    
    let p = document.createElement('p')
    p.innerText = `Bio: ${obj.description}`
    
    monsterContainer.append(h2, h4, p)
}

//Add Event Listener to Back button/////////////////////////////////////
backBtn.addEventListener('click', evt => {
    let monsterContainer = document.querySelector('#monster-container')
    let newContainer = document.createElement('div')
    
    newContainer.id = 'monster-container'
    monsterContainer.parentNode.replaceChild(newContainer, monsterContainer)
    
    //Conditional for the current display page of the API//////////
    if (currentPage > 1){
        currentPage -= 1
    }
    else {
        currentPage
    }

    //Fetch new display page//////////////////////////////////////
    fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(respJSON => respJSON.forEach(createMonsterCard))
})

//Add Event Listener to Forward Button///////////////////////////////
forwardBtn.addEventListener('click', evt => {
    let monsterContainer = document.querySelector('#monster-container')
    let newContainer = document.createElement('div')
    
    newContainer.id = 'monster-container'
    monsterContainer.parentNode.replaceChild(newContainer, monsterContainer)

    currentPage += 1

    //Fetch new display page//////////////////////////////////////
    fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(respJSON => {
            console.log(currentPage)
            console.log(respJSON.length)
            if (respJSON.length < 1){
                currentPage -= 1
                //Added conditional to stay on the current display page//////
                fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
                    .then(resp => resp.json())
                    .then(respJSON => {
                        respJSON.forEach(obj => {
                            createMonsterCard(obj)
                        })
                })
            }
            else {
                //Continues on to display new display page if conditional is not met////////
                respJSON.forEach(obj => {
                    createMonsterCard(obj)
                })
            }
        })
})
