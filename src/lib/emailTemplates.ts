type Theme = "gentle" | "celebratory" | "reflective";

export function futureMessageEmail(
  message: string,
  createdAt: string,
  theme: Theme = "gentle"
) {
  const styles = {
    gentle: {
      bg: "#fafafa",
      accent: "#2d2a26",
      title: "A message from your past self ✨",
    },
    celebratory: {
      bg: "#fff7ed",
      accent: "#c2410c",
      title: "Look how far you’ve come 🎉",
    },
    reflective: {
      bg: "#f5f3ff",
      accent: "#4c1d95",
      title: "A quiet reminder 🌙",
    },
  };

  const t = styles[theme];

  return `
  <div style="
    max-width:600px;
    margin:40px auto;
    padding:32px;
    font-family: Georgia, serif;
    background:${t.bg};
    border-radius:12px;
    line-height:1.7;
    color:#1a1a1a;
  ">
    <h2 style="color:${t.accent};text-align:center;">
      ${t.title}
    </h2>

    <p style="white-space:pre-wrap;margin-top:24px;">
      ${message}
    </p>

    <hr style="margin:32px 0;" />

    <p style="font-size:14px;color:#666;">
      Written on ${new Date(createdAt).toDateString()}
    </p>

     <p style="font-size:12px;color:#999;margin-top:24px;">
      You scheduled this message on FutureSelf.
    </p>
  </div>
  `;
}
