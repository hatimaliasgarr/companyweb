type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  need?: unknown;
  description?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const need = typeof body.need === "string" ? body.need.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";

  if (name.length < 2 || name.length > 80 || !emailPattern.test(email) || email.length > 254 || need.length > 120 || description.length < 20 || description.length > 900) {
    return Response.json(
      { ok: false, error: "Name, valid email and a project description between 20 and 900 characters are required." },
      { status: 422 },
    );
  }

  // Integration boundary: forward the normalized payload to email, CRM or storage here.
  // Until a provider is configured, the public form uses a transparent mailto handoff.
  return Response.json(
    { ok: false, error: "Contact delivery is not configured. Email hatimaliasgar21@gmail.com instead." },
    { status: 503 },
  );
}
