const colorsHex = [
  "#43aee4",
  "#8ee7f0",
  "#c4fae0",
  "#f4efb8",
  "#f8d596",
  "#f7bb7b",
  "#f7ad5f",
  "#e48959",
  "#e86e63",
  "#d34249",
  "#c64a77",
  "#890346",
  "#550085",
  "#7a45be",
  "#433abc",
  "#4f70da",
  "#1f66cf",
  "#0572d1",
  "#5993e6",
  "#76a2eb",
  "#c3bbe4",
  "#f0afaf",
  "#f0a496",
  "#e78a8f",
  "#df8daf",
  "#d365a8",
  "#986fd1",
  "#728ae3",
  "#d99fde",
  "#dab0e4",
  "#8e7ddb",
];
function HEX2HSL(hex) {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;
  return RGB2HSL([r, g, b]);
}
function RGB2HSL(rgb) {
  let [r, g, b] = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}
let hslColors = colorsHex.map((hex) => HEX2HSL(hex));
for (let i = 0; i < hslColors.length; i++) {
  hslColors[i] = hslColors[i].map((x) => Math.round(x * 1000) / 1000);
}
console.log(hslColors);
