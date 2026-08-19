const HTML_UNSAFE_JSON = /[<>&]/g;

const JSON_ESCAPE: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(HTML_UNSAFE_JSON, (character) => JSON_ESCAPE[character]);
}
