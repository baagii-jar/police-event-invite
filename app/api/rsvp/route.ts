import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, phone, organization, attendance, guest_count, notes } = body;

    if (!full_name || !phone || !attendance) {
      return NextResponse.json(
        { error: "Овог нэр болон утасны дугаараа бүрэн бөглөнө үү." },
        { status: 400 }
      );
    }

    const ticketCode = `POLICE100-${Math.floor(100000 + Math.random() * 900000)}`;
    const submissionData = {
      ticket_code: ticketCode,
      full_name,
      phone,
      organization: organization || "",
      attendance,
      guest_count: Number(guest_count) || 0,
      notes: notes || "",
      created_at: new Date().toISOString(),
    };

    let supabaseSaved = false;
    let googleSheetsSaved = false;

    // 1. Save to Supabase if configured
    if (supabase) {
      const { error } = await supabase.from("rsvps").insert([submissionData]);
      if (!error) {
        supabaseSaved = true;
      } else {
        console.warn("Supabase insertion notice:", error.message);
      }
    }

    // 2. Forward to Google Sheets Webhook if configured
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (googleSheetsUrl) {
      try {
        const gsResponse = await fetch(googleSheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
          redirect: "follow",
        });
        if (gsResponse.ok || gsResponse.status === 302) {
          googleSheetsSaved = true;
        }
      } catch (gsErr) {
        console.error("Google Sheets Webhook send error:", gsErr);
      }
    }

    console.log("New RSVP Registration Received:", submissionData);

    return NextResponse.json({
      success: true,
      ticketCode,
      message: "Бүртгэл амжилттай хийгдлээ!",
      data: submissionData,
      supabaseSaved,
      googleSheetsSaved,
    });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json(
      { error: "Серверт алдаа гарлаа. Та дахин оролдоно уу." },
      { status: 500 }
    );
  }
}
