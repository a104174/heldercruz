import type { ContactPayload } from "@/lib/contact-schema";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const escapes: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return escapes[character] || character;
  });

const present = (value?: string) => value?.trim() || "Not provided";

export function buildContactEmail(payload: ContactPayload, fallbackOrigin: string) {
  const submittedAt = new Date().toISOString();
  const origin = payload.origin || fallbackOrigin || "Website contact form";

  const fields = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", present(payload.company)],
    ["Project type", present(payload.projectType)],
    ["Budget", present(payload.budget)],
    ["Submitted at", submittedAt],
    ["Origin", origin]
  ] as const;

  const text = [
    "New portfolio contact request",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message
  ].join("\n");

  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e7e7e7;font-weight:700;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #e7e7e7;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.5;">
      <h1 style="font-size:22px;margin:0 0 16px;">New portfolio contact request</h1>
      <table style="border-collapse:collapse;width:100%;max-width:680px;margin-bottom:20px;">
        <tbody>${rows}</tbody>
      </table>
      <h2 style="font-size:16px;margin:0 0 8px;">Message</h2>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(payload.message)}</p>
    </div>`;

  return {
    subject: `Portfolio contact from ${payload.name}`,
    text,
    html
  };
}
