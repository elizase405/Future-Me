import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { ratelimit } from "@/lib/ratelimit";
import crypto from "crypto";
import { encrypt } from "@/lib/crypto";
import { headers } from "next/headers";

export async function POST(req: Request){
  const { email, message, deliverAt, theme } = await req.json();
  // const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  console.log(ip)
  // const { success } = await ratelimit.limit(ip)

  // if (!success) {
  //   console.log("Rate limit exceeded for IP:", ip);
  //   return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  // }

  if (!email || !message || !deliverAt || !theme) {
    console.log("Validation failed: Missing fields", { email, message, deliverAt, theme });
    return NextResponse.json({error: "Missing fields"}, {status: 400})
  }

  // const token = crypto.randomUUID();
  const token = crypto.randomBytes(32).toString("hex");
  const encryptedMessage = encrypt(message);

  const { error } = await supabase.from("messages").insert({
    email, message: encryptedMessage, deliver_at: deliverAt, verification_token: token, verification_expires: new Date(Date.now() + 24 * 1000 * 60 * 60), theme
  });

  if (error) {
    console.log("Database insertion error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const verifyUrl = `${process.env.BASE_URL}/api/verify?token=${token}`;

  await resend.emails.send({
    from: "FutureMe <onboarding@resend.dev>",
    to: email,
    subject: "Verify your message to the future",
    html: `
  <div style="max-width:500px;margin:auto;font-family:sans-serif;">
    <h2>Confirm your message ✉️</h2>
    <p>
      You wrote a message to your future self.<br />
      Click below to schedule its delivery.
    </p>
    <a href="${verifyUrl}" style="
      display:inline-block;
      margin-top:20px;
      padding:12px 20px;
      background:black;
      color:white;
      text-decoration:none;
      border-radius:6px;
    ">
      Verify message
    </a>
  </div>
`
  })

  console.log("Message received and verification email sent for:", email);
  return NextResponse.json({ success: true })
}