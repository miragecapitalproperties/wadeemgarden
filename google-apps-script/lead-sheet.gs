/**
 * Wadeem Gardens - Lead Form to Google Sheets
 *
 * SETUP:
 * 1. Create a Google Sheet, note its name. This file targets "WadeemGardensLeads_LP".
 * 2. Open the Sheet > Extensions > Apps Script (this BINDS the script to the sheet).
 *    Paste this whole file, replacing any sample function.
 * 3. Deploy > New deployment > Web app (a PRODUCTION deployment, not a test one):
 *      - Execute as: Me
 *      - Who has access: Anyone   (IMPORTANT - not "Only myself", not "Anyone with Google account")
 *    Copy the /exec URL into .env.local as NEXT_PUBLIC_LEAD_API_URL
 *
 * CORS note: the web app does not send Access-Control-Allow-Origin, so the
 * frontend submits through a hidden <iframe>. The script replies with a small
 * HTML page that calls parent.postMessage() with the result, giving the form
 * real success/error feedback instead of a silent failure.
 */

const SHEET_NAME = "WadeemGardensLeads_LP";

const HEADERS = [
  "Timestamp",
  "Full Name",
  "Email",
  "Phone",
  "Country",
  "Property Type",
  "Budget",
  "Message",
];

function readPayload(e) {
  if (e && e.postData && e.postData.contents) {
    const raw = String(e.postData.contents).trim();
    if (raw.charAt(0) === "{") {
      try {
        return JSON.parse(raw);
      } catch (err) {
        /* fall through to e.parameter */
      }
    }
  }
  return (e && e.parameter) || {};
}

function getSheet() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
    if (id) {
      try {
        ss = SpreadsheetApp.openById(id);
      } catch (err) {
        ss = null;
      }
    }
  }
  if (!ss) {
    const files = DriveApp.getFilesByName(SHEET_NAME);
    if (files.hasNext()) {
      try {
        ss = SpreadsheetApp.open(files.next());
      } catch (err) {
        ss = null;
      }
    }
  }
  if (!ss) return null;
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function respond(obj) {
  const json = JSON.stringify(obj);
  const html =
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>' +
    "window.parent.postMessage(" + json + ", '*');" +
    "</script></body></html>";
  return HtmlService.createHtmlOutput(html);
}

function doPost(e) {
  return writeLead(readPayload(e));
}

/**
 * Two roles:
 * 1. When called with ?lead= <JSON> it writes the lead (used by the page's
 *    hidden-iframe GET; GET responses are served directly without a redirect,
 *    so they always load inside a frame).
 * 2. Health check when no parameter is present: open the /exec URL in a tab.
 *    - "OK - <sheet> found"  => public deployment, form will work.
 *    - Redirects to Google login => NOT public; set access to Anyone and
 *      redeploy as a new version.
 */
function doGet(e) {
  const lead = (e && e.parameter && e.parameter.lead) || "";
  if (lead) {
    return writeLead(readJSON(lead));
  }
  try {
    const sheet = getSheet();
    if (sheet) {
      return HtmlService.createHtmlOutput(
        "<h3>OK - '" + SHEET_NAME + "' found and ready to receive leads.</h3>"
      );
    }
    return HtmlService.createHtmlOutput("<h3>ERROR - sheet '" + SHEET_NAME + "' not found.</h3>");
  } catch (err) {
    return HtmlService.createHtmlOutput("<h3>ERROR - " + String(err) + "</h3>");
  }
}

function writeLead(payload) {
  try {
    const sheet = getSheet();
    if (!sheet) {
      throw new Error(
        "Spreadsheet '" + SHEET_NAME + "' not found. Open the sheet and use Extensions > Apps Script."
      );
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }
    sheet.appendRow([
      new Date(),
      payload.fullName || "",
      payload.email || "",
      payload.phone || "",
      payload.country || "",
      payload.propertyType || "",
      payload.budget || "",
      payload.message || "",
    ]);
    return respond({ event: "lead-submitted", ok: true });
  } catch (err) {
    return respond({ event: "lead-error", ok: false, error: String(err) });
  }
}

function readJSON(raw) {
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch (err) {
    return {};
  }
}