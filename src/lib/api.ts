"use client";

export type LeadData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  propertyType: string;
  budget: string;
  message?: string;
};

/**
 * Submits form data to a Google Apps Script web app as a fire-and-forget
 * request. Apps Script responses carry no Access-Control-Allow-Origin header,
 * so "no-cors" mode is required; the browser delivers the POST and writes the
 * row, and we optimistically show success. Requires the deployment to be
 * public ("Who has access: Anyone") or the request is dropped at login.
 */
export async function submitLead(data: LeadData): Promise<{ ok: boolean }> {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_API_URL;

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return { ok: true };
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
    });
    return { ok: true };
  } catch (error) {
    throw error;
  }
}