"use client";

import MapViewer from "./components/MapViewer";

export default function Home() {
  const years = ["2017", "2018", "2022", "2023"]; // You can modify these years as needed

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Plotly Maps Viewer</h1>
        <MapViewer years={years} />
      </main>
    </div>
  );
}
