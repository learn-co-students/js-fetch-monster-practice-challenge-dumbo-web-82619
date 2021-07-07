// let monsterContainer = document.getElementById('monster-container')

// fetch("http://localhost:3000/monsters")
// .then(r => r.json())
// .then(monsters => {
//     console.log(monsters);
// monsters.forEach(monster => {
//     monsterContainer.innerHTML += ` <li>  </li>`

// })
// })
let monsContainer = document.querySelector("#monster-container")
let monsForm = document.querySelector("#monster-form")

monsForm.addEventListener("submit", evt => {
    evt.preventDefault()
    let name = evt.target.name.value
    let age = evt.target.age.value
    let description = evt.target.description.value
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age, 
            description: description
        })
    })
    .then(r => r.json())
    .then(monster => addMonstertoDOM(monster))
})

function addMonstertoDOM(monster){
    const name = monster.name
    const age = monster.age
    const description = monster.description
    const h2 = document.createElement("h2")
    const h4 = document.createElement("h4")
    const p = document.createElement("p")
    h2.innerText = name
    h4.innerText = "Age: " + age
    p.innerText = "Bio: " + description
    monsContainer.append(h2, h4, p)
}

function getMonsters() {
    fetch("http://localhost:3000/monsters")
    .then(r => r.json())
    .then(monsters => {
        monsters.forEach(monster => {
            addMonstertoDOM(monster)
        })
    })
}

getMonsters()