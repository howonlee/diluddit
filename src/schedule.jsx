
function schedule(cardinality, base = 2, power = 1.8, scaling = 0.1) {
  const exponent = Math.power(cardinality, power);
  return base + (exponent * scaling);
}
