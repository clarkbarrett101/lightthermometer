export default function RGB2LUV(rgb) {
  const l = 0.3811 * rgb[0] + 0.5783 * rgb[1] + 0.0402 * rgb[2];
  const u = 0.1967 * rgb[0] + 0.7244 * rgb[1] + 0.0782 * rgb[2];
  const v = 0.0241 * rgb[0] + 0.1288 * rgb[1] + 0.8444 * rgb[2];
  return [l, u, v];
}
