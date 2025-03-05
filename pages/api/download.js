import axios from "axios";

export default async function handler(req, res) {
  const { url, format } = req.query;

  if (!url || !format) {
    return res.status(400).json({ error: "URL and format are required" });
  }

  try {
    // Example: Fetch media for other platforms (simplified version)
    const response = await axios.get(`https://example.com/scrape`, {
      params: { url, format },
    });

    res.status(200).json({ downloadUrl: response.data.downloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
}
