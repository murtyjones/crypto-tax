import v2 from 'csvtojson/v2';
import { differenceInDays } from 'date-fns';

export interface Order {
  date: Date;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  fees: number;
  totalMinusFees: number;
}

const makeOrder = (order: any): Order => ({
  date: new Date(order.date),
  side: order.side.toLowerCase(),
  price: Number(order.price),
  amount: Number(order.amount),
  fees: Number(order.fees),
  totalMinusFees: Number(order['total minus fees']),
});

export const load = async (file: string) => {
  const orders = await v2().fromFile(file);
  // marshall into a good type, then sort by asecnding date based on epoch timestamp
  return orders.map(makeOrder);
};

export interface Entry {
  acquiredOn: Date;
  disposedOn: Date;
  proceeds: number;
  gains: number;
  type: 'LT' | 'ST';
}

export const main = (buys: Order[], sells: Order[]) => {
  buys.sort((a, b) => a.date.getTime() - b.date.getTime());
  sells.sort((a, b) => a.date.getTime() - b.date.getTime());
  const entries: Entry[] = [];
  let buyIndex = 0;
  let amountSold = 0;
  sells.forEach((sale) => {
    const entry: Entry = {
      acquiredOn: new Date('9999-12-30T12:00:00'),
      disposedOn: sale.date,
      proceeds: sale.amount * sale.price,
      gains: 0,
      type: 'ST',
    };
    while (sale.amount > 0) {
      const buy = buys[buyIndex];
      // Pick any date as the acquiredOn date (they should all be close or the same anyways)
      if (entry.acquiredOn > buy.date) {
        entry.acquiredOn = buy.date;
      }
      // If any date in the sale is more than a year ago, it's long-term capital gains
      if (Math.abs(differenceInDays(buy.date, sale.date)) > 365) {
        entry.type = 'LT';
      }
      const entryAmount = Math.min(buy.amount, sale.amount);
      const gain = (sale.price - buy.price) * entryAmount;
      entry.gains += gain;

      buy.amount -= entryAmount;
      sale.amount -= entryAmount;
      amountSold += entryAmount;
      if (buy.amount === 0) {
        buyIndex += 1;
      }
    }
    entries.push(entry);
  });
  return entries;
};
