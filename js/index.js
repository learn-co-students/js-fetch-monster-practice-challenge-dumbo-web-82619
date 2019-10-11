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
button.addEventListener('click', evt => {
    evt.preventDefault()
    let form = evt.target.parentElement
    let monsterName = form.name.value
    let monsterAge = form.age.value
    let monsterBio = form.description.value
    
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

fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
.then(resp => resp.json())
.then(respJSON => respJSON.forEach(createMonsterCard))

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

backBtn.addEventListener('click', evt => {
    let monsterContainer = document.querySelector('#monster-container')
    let newContainer = document.createElement('div')
    
    newContainer.id = 'monster-container'
    monsterContainer.parentNode.replaceChild(newContainer, monsterContainer)
    
    if (currentPage > 1){
        currentPage -= 1
    }
    else {
        currentPage
    }

    fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(respJSON => respJSON.forEach(createMonsterCard))
})

forwardBtn.addEventListener('click', evt => {
    let monsterContainer = document.querySelector('#monster-container')
    let newContainer = document.createElement('div')
    
    newContainer.id = 'monster-container'
    monsterContainer.parentNode.replaceChild(newContainer, monsterContainer)

    currentPage += 1

    fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
        .then(resp => resp.json())
        .then(respJSON => {
            console.log(currentPage)
            console.log(respJSON.length)
            if (respJSON.length < 1){
                currentPage -= 1
                fetch(`http://localhost:3000/monsters/?_limit=${pageLimit}&_page=${currentPage}`)
                    .then(resp => resp.json())
                    .then(respJSON => {
                        respJSON.forEach(obj => {
                            createMonsterCard(obj)
                        })
                })
            }
            else {
                respJSON.forEach(obj => {
                    createMonsterCard(obj)
                })
            }
        })
})
