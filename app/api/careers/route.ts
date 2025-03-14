import jobListings from "@/core/db-static/db_careers_page/job-listings.json"; // Assicurati che sia nella cartella /data
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(jobListings);
}
