import convert from "color-convert"

export function compareColors(color1, color2) {
  return toHex(color1) === toHex(color2)
}

export function chooseColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
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
  const randomHex = Math.floor(Math.random() * 16777215)
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
