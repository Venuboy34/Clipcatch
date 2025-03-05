import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [link, setLink] = useState("");
  const [format, setFormat] = useState("mp4");
  const [resolutions, setResolutions] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const videoUrl = new URL(link);
      const domain = videoUrl.hostname.toLowerCase();

      // If it's a YouTube video, get resolution options
      if (domain.includes("youtube.com") || domain.includes("youtu.be")) {
        const youtubeResponse = await axios.get(`/api/youtube`, {
          params: { url: link },
        });
        setResolutions(youtubeResponse.data.resolutions || []);
      } else {
        // For other platforms, fetch media
        const response = await axios.get(`/api/download`, {
          params: { url: link, format: format },
        });
        setDownloadLink(response.data.downloadUrl);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolutionChange = (e) => {
    setSelectedResolution(e.target.value);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>ClipCatch - Download Social Media Videos</h1>
      <input
        type="text"
        placeholder="Paste your link here"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ padding: "10px", width: "80%", margin: "10px 0" }}
      />
      <div>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        >
          <option value="mp4">MP4</option>
          <option value="mp3">MP3</option>
        </select>
      </div>

      {resolutions.length > 0 && (
        <div>
          <select
            value={selectedResolution}
            onChange={handleResolutionChange}
            style={{ padding: "10px", margin: "10px" }}
          >
            {resolutions.map((res, index) => (
              <option key={index} value={res}>
                {res}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleDownload}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Download"}
      </button>

      {downloadLink && (
        <div>
          <a href={downloadLink} target="_blank" style={{ display: "block", marginTop: "20px" }}>
            Click here to download
          </a>
        </div>
      )}
    </div>
  );
}
