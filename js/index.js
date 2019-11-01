document.addEventListener("DOMContentLoaded",()=>{
    counter = 1
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${counter}`,{
    })
        .then(response=>response.json())
        .then(monsterArr=> {
            monsterArr.forEach(monster => displayMonster(monster))
        })

    const forwardButton = document.getElementById("forward")
    forwardButton.addEventListener("click", pageForward )

    const backButton = document.getElementById("back")
    backButton.addEventListener("click", pageBack)

    const monsterForm = document.getElementById("monster-form")
    monsterForm.addEventListener("submit", createMonster)
})

let counter

function createMonster(){

    event.preventDefault();

    let monsterName = document.getElementById("name").value
    let monsterAge = document.getElementById("age").value
    let monsterDescription = document.getElementById("description").value

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({
            name: monsterName,
            age: monsterAge,
            description:  monsterDescription
        })

    }
    fetch("http://localhost:3000/monsters", configObj)
    .then(response=>response.json())
    .then(monster=> displayMonster(monster))

    document.getElementById("monster-form").reset();


}

function pageForward(event){
    const monsterContainer = document.getElementById("monster-container")
    while (monsterContainer.firstElementChild){
        monsterContainer.firstElementChild.remove()
    }

    counter +=1 

    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${counter}`,{
    })
        .then(response=>response.json())
        .then(monsterArr=> {
            monsterArr.forEach(monster => displayMonster(monster))
        })

}

function pageBack(){
    const monsterContainer = document.getElementById("monster-container")
    while (monsterContainer.firstElementChild){
        monsterContainer.firstElementChild.remove()
    }

    counter -=1

    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${counter}`,{
    })
        .then(response=>response.json())
        .then(monsterArr=> {
            monsterArr.forEach(monster => displayMonster(monster))
        })
}

function displayMonster(monster){
    const monsterContainer = document.getElementById("monster-container")
    const card = document.createElement("div")
    monsterContainer.appendChild(card)

    const header = document.createElement("h2")
    header.innerText = monster.name
    card.appendChild(header)

    const age = document.createElement("h4")
    age.innerText = `Age: ${monster.age}`
    card.appendChild(age)

    const bio = document.createElement("p")
    bio.innerText = `Bio: ${monster.description}`
    card.appendChild(bio)
}