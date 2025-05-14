import puppeteer from "puppeteer";

export async function scrapeStockData(stockName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to Screener.in
  await page.goto("https://www.screener.in/");

  // Type the stock name into the search box
  await page.type("#navbar-search-input", stockName);
  await page.keyboard.press("Enter");

  // Wait for results to load
  await page.waitForSelector(".search-results");

  // Extract stock details
  const stockData = await page.evaluate(() => {
    const stockElement = document.querySelector(".search-results a");
    if (stockElement) {
      return {
        name: stockElement.innerText,
        url: stockElement.href,
      };
    }
    return null;
  });

  await browser.close();
  return stockData;
}
