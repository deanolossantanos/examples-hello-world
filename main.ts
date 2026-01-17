// main.ts — Static SPA server for Deno Deploy

import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { extname, join } from "https://deno.land/std@0.201.0/path/mod.ts";

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
};

console.log("🚀 Qwik SPA running on Deno Deploy");

serve(async (req) => {
  const url = new URL(req.url);
  const pathname = decodeURIComponent(url.pathname);

  // Try to serve static file from dist/
  const filePath = join("dist", pathname === "/" ? "index.html" : pathname);

  try {
    const file = await Deno.readFile(filePath);
    const type = MIME[extname(filePath)] ?? "application/octet-stream";
    return new Response(file, { headers: { "content-type": type } });
  } catch (_) {
    // SPA fallback → always return index.html
    const index = await Deno.readFile("dist/index.html");
    return new Response(index, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});
