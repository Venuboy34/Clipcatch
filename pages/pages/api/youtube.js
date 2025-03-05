import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Use yt-dlp or an equivalent API to fetch available resolutions for YouTube
    // Example API call, modify with the actual API or service you use.
    const response = await axios.get(`https://yt-dlp-api.vercel.app/api/yt-dlp`, {
      params: { url: url },
    });

    // Return the resolutions or other relevant data
    const resolutions = response.data.formats.map((format) => format.resolution);
    res.status(200).json({ resolutions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch YouTube video" });
  }
}
