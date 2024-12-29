// app/api/maps/[year]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  // { params }: { params: { year: string } },
  // context: { params: { year: string } },
  context: { params: Record<string, string> },
) {
  // const year = params.year;
  // const { year } = context.params;
  const year = context.params.year;

  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "maps",
      `map-${year}.html`,
    );
    const htmlContent = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ htmlContent });
  } catch (error) {
    console.error("Error reading map file:", error);
    return NextResponse.json(
      { error: "Error loading map data" },
      { status: 500 },
    );
  }
}
