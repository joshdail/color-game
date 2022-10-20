import convert from "color-convert"

const NUM_POSSIBLE_HEX_VALUES = 16777216

export function compareColors(color1, color2) {
  return toHex(color1) === toHex(color2)
}

export function chooseColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function adjustDifficulty(colors, { difficulty = "medium" } = {}) {
  const selectedColorChannel = ["r", "g", "b"][Math.floor(Math.random() * 3)]
  return difficulty === "hard"
    ? setToHard(colors, selectedColorChannel)
    : setToMedium(colors, selectedColorChannel)
}

function setToMedium(colors, selectedColorChannel) {
  const newColorArray = []
  const initialColor = colors[0]
  colors.forEach(color => {
    if (selectedColorChannel === "r") {
      newColorArray.push(`#${initialColor.slice(1, 3)}${color.slice(3)}`)
    } else if (selectedColorChannel === "g") {
      newColorArray.push(
        `#${color.slice(1, 3)}${initialColor.slice(3, 5)}${color.slice(5)}`
      )
    } else if (selectedColorChannel === "b") {
      newColorArray.push(`#${color.slice(1, 5)}${initialColor.slice(5)}`)
    }
  })
  return newColorArray
}

function setToHard(colors, selectedColorChannel) {
  const newColorArray = []
  const initialColor = colors[0]
  colors.forEach(color => {
    if (selectedColorChannel === "r") {
      newColorArray.push(`#${color.slice(1, 3)}${initialColor.slice(3)}`)
    } else if (selectedColorChannel === "g") {
      newColorArray.push(
        `#${initialColor.slice(1, 3)}${color.slice(3, 5)}${initialColor.slice(
          5
        )}`
      )
    } else if (selectedColorChannel === "b") {
      newColorArray.push(`#${initialColor.slice(1, 5)}${color.slice(5)}`)
    }
  })
  return newColorArray
}

export function generateRandomColors(number) {
  if (number < 1) return []
  return generateRandomColors(number - 1).concat(generateRandomHexColorString())
}

export function toHex(color) {
  if (color.charAt(0) === "h") return HSLToHex(color)
  if (color.charAt(0) === "r") return RGBToHex(color)
  return color
}

export function toRGB(color) {
  if (color.charAt(0) === "h") return HSLToRGB(color)
  if (color.charAt(0) === "#") return hexToRGB(color)
  return color
}

export function toHSL(color) {
  if (color.charAt(0) === "r") return RGBtoHSL(color)
  if (color.charAt(0) === "#") return hexToHSL(color)
  return color
}

function generateRandomHexColorString() {
  const randomHex = Math.floor(Math.random() * NUM_POSSIBLE_HEX_VALUES)
    .toString(16)
    .toUpperCase()
  return randomHex.length === 6
    ? `#${randomHex}`
    : generateRandomHexColorString()
}

function hexToRGB(color) {
  const result = convert.hex.rgb(color.slice(1))
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`
}

function RGBToHex(color) {
  const rgbArray = color.substr(4).split(")")[0].split(", ")
  const result = convert.rgb.hex(rgbArray)
  return `#${result}`.toUpperCase()
}

function HSLToRGB(color) {
  const hslArray = color.substr(4).split(")")[0].split(", ")
  const result = convert.hsl.rgb(hslArray)
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`
}

function RGBtoHSL(color) {
  const rgbArray = color.substr(4).split(")")[0].split(", ")
  const result = convert.rgb.hsl(rgbArray)
  return `hsl(${result[0]}, ${result[1]}, ${result[2]})`
}

function hexToHSL(color) {
  const result = convert.hex.hsl(color.slice(1))
  return `hsl(${result[0]}, ${result[1]}, ${result[2]})`
}

function HSLToHex(color) {
  const hslArray = color.substr(4).split(")")[0].split(", ")
  const result = convert.hsl.hex(hslArray)
  return `#${result}`.toUpperCase()
}
