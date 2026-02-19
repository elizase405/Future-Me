import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({error: "Invalid token"}, {status: 400});
  }
  
  const { data: message, error } = await supabase.from("messages").select("*").eq("verification_token", token).gt("verification_expires", new Date().toISOString())

  if (!message) {
  return new Response("Invalid or expired token", { status: 400 });
}

  await supabase.from("messages").update({is_verified: true, verification_token: null, verification_expires: null}).eq("verification_token", token);

  return NextResponse.redirect(`${process.env.BASE_URL}`);
}