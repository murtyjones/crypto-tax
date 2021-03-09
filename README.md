*Disclaimer*: This code is for informational purposes only and is not guaranteed to correctly calculate your tax liability.

One of the best parts of owning cryptocurrency is the opportunity to pay taxes when you sell it. This repo calculates your gains on crypto sales and indicates whether those gains should be characterized as long-term (held for >1 year) or short-term.

# Example Inputs

You should be able to get these inputs in roughly this format from whatever exchange you use (Kraken, Coinbase, Binance, etc.)

## buys.csv

```csv
date,side,amount,price,fees,total minus fees
2015-05-02T20:06:02Z,Buy,1,47889.9,0,47889.9
...
```

## sells.csv

```csv
date,side,amount,price,fees,total minus fees
2015-05-02T20:06:02Z,Sell,1,47889.9,0,47889.9
...
```
