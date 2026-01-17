// main.ts
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { extname } from "https://deno.land/std@0.201.0/path/mod.ts";

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
  ".map": "application/octet-stream",
};

console.log("Starting static server (repo root)");

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const pathnameRaw = decodeURIComponent(url.pathname);

    // Fast health check for warm-up probes
    if (pathnameRaw === "/_health") {
      return new Response("ok", { status: 200 });
    }

    // Prevent path traversal
    if (pathnameRaw.includes("..")) {
      return new Response("Forbidden", { status: 403 });
    }

    // Serve root -> index.html
    if (pathnameRaw === "/" || pathnameRaw === "") {
      const body = await Deno.readFile("index.html");
      return new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
    }

    // Trim leading slash and serve file
    let pathname = pathnameRaw.startsWith("/") ? pathnameRaw.slice(1) : pathnameRaw;
    try {
      const file = await Deno.readFile(pathname);
      const ext = extname(pathname).toLowerCase();
      const contentType = MIME[ext] ?? "application/octet-stream";
      return new Response(file, { status: 200, headers: { "content-type": contentType } });
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        // SPA fallback
        const body = await Deno.readFile("index.html");
        return new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
      }
      console.error("File read error:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
