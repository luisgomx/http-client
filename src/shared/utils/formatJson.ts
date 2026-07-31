type FormatResult =
  | { ok: true; pretty: string; value: unknown }
  | { ok: false; raw: string };

export function formatJson(raw: string): FormatResult {
  try {
    const value: unknown = JSON.parse(raw);
    return { ok: true, pretty: JSON.stringify(value, null, 2), value };
  } catch {
    return { ok: false, raw };
  }
}
