import { scrapeStockData } from "@/utils/scraper";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  try {
    const stockData = await scrapeStockData(query);

    if (!stockData) {
      return Response.json({ error: "Stock not found" }, { status: 404 });
    }

    return Response.json(stockData);
  } catch (error) {
    console.error("Error scraping stock data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
