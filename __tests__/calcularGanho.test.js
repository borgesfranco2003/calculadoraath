const { calcularGanho } = require('../script.js');

test('calcula ganho potencial corretamente', () => {
  const { quantidade, ganho } = calcularGanho(1000, 20, 50);
  expect(quantidade).toBeCloseTo(50);
  expect(ganho).toBeCloseTo(1500);
});
