const dbSchema = require("./models/Rate");
const fetch = require("node-fetch");

CronJob = require("cron").CronJob;
module.exports.job = new CronJob(
  " 0 * * * *",
  async function () {
    console.log("cron start");

    let mainCurrency = [
      "CAD",
      "HKD",
      "ISK",
      "PHP",
      "DKK",
      "HUF",
      "CZK",
      "GBP",
      "RON",
      "SEK",
      "IDR",
      "INR",
      "BRL",
      "RUB",
      "HRK",
      "JPY",
      "THB",
      "CHF",

      "MYR",
      "BGN",
      "TRY",
      "CNY",
      "NOK",
      "NZD",
      "ZAR",

      "MXN",
      "ILS",
      "KRW",
      "PLN",
      "UAH",

      "GEL",
    ];

    let requests = mainCurrency.map(
      (elem) =>
        "https://free.currconv.com/api/v7/convert?q=USD_" +
        `${elem}` +
        "&compact=ultra&apiKey=693c77f9163e043ede8c"
    );

    let responsMainCurrency = await Promise.all(
      requests.map(async (value) => {
        let currency = await fetch(value);

        return currency.json();
      })
    );
    let result = responsMainCurrency.map((elem, i) => {
      return [Object.entries(elem)[0][0].slice(4), Object.entries(elem)[0][1]];
    });
    let readyToSend = Object.fromEntries(result);

    // let restCurrency = await fetch("https://api.exchangeratesapi.io/latest");
    // let jsonRestCurrency = await restCurrency.json();
    // jsonRestCurrency.rates.UAH = responsMainCurrency[0].USD_UAH; // ADD UAH, GEL
    // jsonRestCurrency.rates.GEL = responsMainCurrency[1].USD_GEL;

    // let rates = jsonRestCurrency.rates;
    let rates = readyToSend;
    let hours = new Date().getHours();

    if (hours === 23) {
      await dbSchema.create({ currencyValue: rates, chart: 1 });
    }
    await dbSchema.create({ currencyValue: rates });
  },
  null,
  true,
  "America/Chicago"
);
