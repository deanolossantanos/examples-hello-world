// main.ts — robust static server with SPA fallback
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

console.log("Starting static server (repo root)"); // visible in Deploy logs

serve(async (req) => {
  try {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // Normalize and prevent path traversal
    if (pathname.includes("..")) {
      return new Response("Forbidden", { status: 403 });
    }

    // Default to index.html for root or empty path
    if (pathname === "/" || pathname === "") {
      const body = await Deno.readFile("index.html");
      return new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
    }

    // Trim leading slash
    if (pathname.startsWith("/")) pathname = pathname.slice(1);

    // Try to read the file from repo root
    try {
      const file = await Deno.readFile(pathname);
      const ext = extname(pathname).toLowerCase();
      const contentType = MIME[ext] ?? "application/octet-stream";
      return new Response(file, { status: 200, headers: { "content-type": contentType } });
    } catch (err) {
      // If file not found, return index.html for SPA routes
      if (err instanceof Deno.errors.NotFound) {
        const body = await Deno.readFile("index.html");
        return new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
      }
      // Other errors: log and return 500
      console.error("File read error:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
