export default function RGB2LUV(rgb) {
  const l = 0.3811 * rgb[0] + 0.5783 * rgb[1] + 0.0402 * rgb[2];
  const u = -0.147 * rgb[0] - 0.289 * rgb[1] + 0.436 * rgb[2];
  const v = 0.615 * rgb[0] - 0.515 * rgb[1] - 0.1 * rgb[2];
  return [l, u, v];
}
