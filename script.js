import {
  generateRandomColors,
  adjustDifficulty,
  compareColors,
  chooseColor,
  toHSL,
  toHex,
  toRGB
} from "./color-game.js"

const body = document.querySelector("body")

const formatOptions = document.getElementById("format-options")
const rgb = document.getElementById("rgb")
const hex = document.getElementById("hex")
const hsl = document.getElementById("hsl")
const difficultyOptions = document.getElementById("difficulty-options")
const medium = document.getElementById("medium")
const hard = document.getElementById("hard")
const displayOptions = document.getElementById("display-options")
const colorString = document.getElementById("color-string")
const colorGrid = document.getElementById("color-grid")
const colorButtonTemplate = document.getElementById("color-button-template")
const resultSection = document.getElementById("result-section")
const result = document.getElementById("result")
const nextColorButton = document.getElementById("next-color")

formatOptions.addEventListener("click", e => {
  displayColorToGuess(colorString.innerText)
})

difficultyOptions.addEventListener("click", e => {
  if (e.target.name === "difficulty") start()
})

displayOptions.addEventListener("click", e => {
  if (e.target.value === "dark") {
    body.classList.add("dark-mode")
    body.classList.remove("light-mode")
  } else if (e.target.value === "light") {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
  }
})

function start() {
  colorGrid.innerHTML = ""
  resultSection.classList.add("hide")
  let colors = generateRandomColors(6)
  if (medium.checked) {
    colors = adjustDifficulty(colors, { difficulty: "medium" })
  }
  if (hard.checked) {
    colors = adjustDifficulty(colors, { difficulty: "hard" })
  }
  displayColors(colors)
  const correctColor = chooseColor(colors)
  displayColorToGuess(correctColor)
}

function displayColors(colors) {
  colors.forEach(color => {
    const colorButton =
      colorButtonTemplate.content.firstElementChild.cloneNode(true)
    colorButton.style.backgroundColor = color
    colorButton.addEventListener("click", e => {
      checkColorGuess(e)
    })
    colorGrid.appendChild(colorButton)
  })
}

function displayColorToGuess(color) {
  if (rgb.checked) colorString.innerText = toRGB(color)
  if (hex.checked) colorString.innerText = toHex(color)
  if (hsl.checked) colorString.innerText = toHSL(color)
}

function checkColorGuess(e) {
  resultSection.classList.remove("hide")
  result.innerText = compareColors(
    e.target.style.backgroundColor,
    colorString.innerText
  )
    ? "Correct"
    : "Incorrect"
  showCorrectAnswer()
}

function showCorrectAnswer() {
  const colorButtons = Array.from(colorGrid.childNodes)
  colorButtons.forEach(button => {
    if (!compareColors(button.style.backgroundColor, colorString.innerText)) {
      button.classList.add("wrong")
    }
    button.disabled = true
  })
}

start()

nextColorButton.addEventListener("click", e => {
  start()
})
