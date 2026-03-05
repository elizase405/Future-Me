import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { futureMessageEmail } from "@/lib/emailTemplates";
import { decrypt } from "@/lib/crypto";

export const revalidate = 0; // Ensures the function is not cached

export async function GET() {
    const today = new Date().toISOString().split("T")[0];

    const { data: messages, error } = await supabase.from("messages").select("*").eq("is_verified", true).eq("deliver_at", today).eq("status", "pending");
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    for (const msg of messages || []) {
        try {
            await resend.emails.send({
                from: "Your Past Self <onboarding@resend.dev>",
                to: msg.email,
                subject: "A message from your past self ",
                html: futureMessageEmail(decrypt(msg.message), msg.created_at, msg.theme),
            })
            await supabase.from("messages").update({ status: "sent", delivered_at: new Date() }).eq("id", msg.id)
            return NextResponse.json({ success: true, sent: messages?.length || 0 });
        } catch (err) {
            await supabase.from("messages").update({ status: "failed", retries: { increment: 1 }}).eq("id", msg.id);
        }
    }

    return NextResponse.json({ sent: messages?.length || 0, msg: "No messages to send today" });
}