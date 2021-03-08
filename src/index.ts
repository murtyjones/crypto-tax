import fs from 'fs';
import { parse } from 'json2csv';
import { load, main } from './lib';

const BUYS = 'buys.csv';
const SELLS = 'sells.csv';

(async () => {
  const buys = await load(BUYS);
  const sells = await load(SELLS);
  const entries = main(buys, sells);
  const csv = parse(entries);
  fs.writeFile('gains.csv', csv, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
})();
