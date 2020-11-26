let Color = {}

Color.getContrast = function (color, useBlackWhite) {
    let r = 0, g = 0, b = 0
    if(color.match(/^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)) {        
        if (color.indexOf('#') === 0) {
            color = color.slice(1)
        }
        // convert 3-digit color to 6-digits.
        if (color.length === 3) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2]
        }
        if (color.length !== 6) {
            throw new Error('Invalid HEX color.')
        }
        r = parseInt(color.slice(0, 2), 16)
        g = parseInt(color.slice(2, 4), 16)
        b = parseInt(color.slice(4, 6), 16)
    }
    let match = color.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/)
    if(match) {
        r = match[1]
        g = match[2]
        b = match[3]
    }
    if (useBlackWhite) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#333333'
            : '#FFFFFF'
    }
    // invert color components
    r = (255 - r).toString(16)
    g = (255 - g).toString(16)
    b = (255 - b).toString(16)
    // pad each with zeros and return
    return "#" + Color.padZero(r) + Color.padZero(g) + Color.padZero(b)
}

Color.padZero = function (str, len) {
    len = len || 2
    let zeros = new Array(len).join('0')
    return (zeros + str).slice(-len)
}

Color.componentToHex = function (c) {
  var hex = c.toString(16)
  return hex.length === 1 ? "0" + hex : hex
}

Color.rgbToHex = function (r, g, b) {
  return "#" + Color.componentToHex(r) + Color.componentToHex(g) + Color.componentToHex(b)
}

export default Color