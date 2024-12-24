"use client";

import { useState, useEffect } from "react";

interface MapViewerProps {
  years: string[];
}

export default function MapViewer({ years }: MapViewerProps) {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [mapContent, setMapContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMapData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/maps/${selectedYear}`);
        const data = await response.json();
        setMapContent(data.htmlContent);
        // Add a small delay before removing the loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
      setLoading(false);
    }

    fetchMapData();
  }, [selectedYear]);

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Header with dropdown */}
      <div className="bg-white shadow-md p-4 z-10">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-48 px-4 py-2 border rounded-md shadow-sm"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Main content area */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-lg">Loading map...</div>
          </div>
        ) : (
          <iframe
            srcDoc={mapContent}
            className="w-full h-full border-none"
            title={`Map for ${selectedYear}`}
            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
