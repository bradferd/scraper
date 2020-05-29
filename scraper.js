const puppeteer = require("puppeteer");

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');

    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let data = [], title, price;

        let elements = document.querySelectorAll('li.col-xs-6');
        elements.forEach(el => {
            title = el.querySelector('h3 > a').title;
            price = el.querySelector('.price_color').innerText;
            imageUrl = el.querySelector('div.image_container > a').href;
            data.push({ title, price, imageUrl });
        })

        return data;
    });

    browser.close();

    return result;
};

scrape().then((value) => {
  console.log(value);
});
