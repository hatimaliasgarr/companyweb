type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  need?: unknown;
  budget?: unknown;
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

  if (name.length < 2 || !emailPattern.test(email) || !need || description.length < 20) {
    return Response.json(
      { ok: false, error: "Name, valid email, service need and a short project description are required." },
      { status: 422 },
    );
  }

  // Integration boundary: forward the normalized payload to email, CRM or storage here.
  // The public website intentionally does not persist submissions until a provider is configured.
  return Response.json({ ok: true }, { status: 200 });
}
