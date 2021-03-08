import { main, Order } from './lib';

it('should use multiple buys properly', () => {
  const buys: Order[] = [
    {
      amount: 10,
      date: new Date('2020-02-01'),
      price: 100,
      fees: 0,
      totalMinusFees: 10 * 100,
      side: 'buy',
    },
    {
      amount: 10,
      date: new Date('2020-04-01'),
      price: 150,
      fees: 0,
      totalMinusFees: 10 * 150,
      side: 'buy',
    },
  ];
  const sells: Order[] = [
    {
      amount: 15,
      date: new Date('2021-03-01'),
      price: 200,
      fees: 0,
      totalMinusFees: 15 * 200,
      side: 'sell',
    },
  ];

  const entries = main(buys, sells);

  expect(entries).toHaveLength(1);
  expect(entries[0].gains).toBe(1250);
  expect(entries[0].type).toBe('LT');
});

it('should do ST if short term', () => {
  const buys: Order[] = [
    {
      amount: 10,
      date: new Date('2020-02-01'),
      price: 100,
      fees: 0,
      totalMinusFees: 10 * 100,
      side: 'buy',
    },
    {
      amount: 10,
      date: new Date('2020-02-01'),
      price: 150,
      fees: 0,
      totalMinusFees: 10 * 150,
      side: 'buy',
    },
  ];
  const sells: Order[] = [
    {
      amount: 15,
      date: new Date('2020-03-01'),
      price: 200,
      fees: 0,
      totalMinusFees: 15 * 200,
      side: 'sell',
    },
  ];

  const entries = main(buys, sells);

  expect(entries).toHaveLength(1);
  expect(entries[0].gains).toBe(1250);
  expect(entries[0].type).toBe('ST');
});
