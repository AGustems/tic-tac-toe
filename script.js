// Variables needed (Turn, classes, winning combinations)
let circleTurn
const xClass = 'x'
const oClass = 'o'
const winningCombs = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Getting the necessary elements from the DOM 
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMessage = document.getElementById('winningMessage')
const winMessageText = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartBtn')
const xPoints = document.getElementById('xPoints')
const oPoints = document.getElementById('oPoints')

// Function to start the game
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    checkLocalStorage()
    setHoverClass()
    winMessage.classList.remove('show')
}

// Function to trigger the end game screen
function endGame(draw) {
    if(draw){
        winMessageText.innerHTML = 'Draw!'
    } else {
        winMessageText.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
        addWin(circleTurn)
    }
    winMessage.classList.add('show')
}

// Function to check if there is a draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

// Function to handle the click in the diferent cells
function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? oClass : xClass
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        switchTurns()
        setHoverClass()
    }
}

// Function to place the mark in the cell clicked
function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

// Function to add the hover mark effect to the cells
function setHoverClass() {
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if (circleTurn){
        board.classList.add(oClass)
    } else {
        board.classList.add(xClass)
    }
}

// Function to switch between X and O
function switchTurns(){
    circleTurn = !circleTurn
}

// Function to check if one of the winning combinations has occured
function checkWin(currentClass){
    return winningCombs.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

// Function to save or get from localstorage and set the score in the DOM
function checkLocalStorage(){
    if(localStorage.xPoints && localStorage.oPoints){
        const pointsXs = localStorage.getItem('xPoints')
        const pointsOs = localStorage.getItem('oPoints')
        xPoints.innerHTML = pointsXs
        oPoints.innerHTML = pointsOs
    } else {
        localStorage.setItem('xPoints', '0')
        localStorage.setItem('oPoints', '0')
    }
}

// Function to add the victory from X or O in the localStorage
function addWin(circleTurn){
    if(circleTurn){
        const pointsOs = localStorage.getItem('oPoints')
        const newOPoints = JSON.parse(pointsOs) + 1;
        localStorage.setItem('oPoints', `${newOPoints}`)
    } else if (!circleTurn){
        const pointsXs = localStorage.getItem('xPoints')
        const newXPoints = JSON.parse(pointsXs) + 1;
        localStorage.setItem('xPoints', `${newXPoints}`)
    } else {
        return
    }
}

restartButton.addEventListener('click', startGame)
startGame()