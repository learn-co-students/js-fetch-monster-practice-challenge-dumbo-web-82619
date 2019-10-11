document.addEventListener('DOMContentLoaded', (event) => {
  
// SELECTION VARIABLES \\

  const monsterCollectionDiv = document.querySelector('#monster-container')
  const newMonsterForm = document.querySelector('#new-monster-form')
  const backButton = document.querySelector('#back')
  const forwardButton = document.querySelector('#forward')
  let pageNumber = 1



// ON-LOAD FETCHES \\ 

  loadMonsterPage(pageNumber)



// HELPER METHODS \\

  function loadMonsterPage(pageNumber) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(monsterListJson => {
      monsterListJson.forEach(addMonsterToMonstersDiv)
    })
  }

  function addMonsterToMonstersDiv(monsterJson) {
    const monsterDiv = document.createElement('div')
    const monsterNameH1 = document.createElement('h1')
    const monsterAgeH4 = document.createElement('h4')
    const monsterDescriptionP = document.createElement('p')

    monsterNameH1.innerText = monsterJson.name
    monsterAgeH4.innerText = `Age: ${monsterJson.age}`
    monsterDescriptionP.innerText = monsterJson.description

    monsterDiv.append(monsterNameH1, monsterAgeH4, monsterDescriptionP)
    monsterCollectionDiv.append(monsterDiv)
  }


  function removeChildren(parentNode) {
    while (parentNode.firstChild) {
      parentNode.removeChild(parentNode.firstChild);
    }
  }



// EVENT LISTENERS \\

  newMonsterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    let monsterName = event.target.name.value
    let monsterAge = event.target.age.value
    let monsterDescription = event.target.description.value

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application.json'
      },
      body: JSON.stringify({
        name: monsterName,
        age: monsterAge,
        description: monsterDescription
      })
    })
    .then(response => response.json())
    .then(monsterJson => {
      addMonsterToMonstersDiv(monsterJson)
    })
  })


  backButton.addEventListener('click', (event) => {
    pageNumber > 1 ? pageNumber -= 1 : pageNumber = 1
    removeChildren(monsterCollectionDiv)
    loadMonsterPage(pageNumber)
  })

  
  forwardButton.addEventListener('click', (event) => {
    console.log(monsterCollectionDiv.childElementCount)
    monsterCollectionDiv.childElementCount < 50 ? pageNumber = 1 : pageNumber += 1
    removeChildren(monsterCollectionDiv)
    loadMonsterPage(pageNumber)
  })



}) // END OF DOMCONTENTLISTENER \\