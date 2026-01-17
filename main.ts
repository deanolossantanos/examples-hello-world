// main.ts — Qwik SSR + static file server for Deno Deploy

import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { extname, join } from "https://deno.land/std@0.201.0/path/mod.ts";

// Qwik SSR entry
import render from "./src/entry.ssr.tsx";

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

console.log("🚀 Starting Qwik SSR server on Deno Deploy");

serve(async (req) => {
  try {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);

    // Health check
    if (pathname === "/_health") {
      return new Response("ok", { status: 200 });
    }

    // Prevent path traversal
    if (pathname.includes("..")) {
      return new Response("Forbidden", { status: 403 });
    }

    // Try static files from /public and /dist
    const staticPaths = [
      join("public", pathname),
      join("dist", pathname),
    ];

    for (const filePath of staticPaths) {
      try {
        const file = await Deno.readFile(filePath);
        const ext = extname(filePath).toLowerCase();
        const type = MIME[ext] ?? "application/octet-stream";

        return new Response(file, {
          status: 200,
          headers: { "content-type": type },
        });
      } catch (_) {
        // ignore and continue
      }
    }

    // --- SSR fallback ---
    const result = await render({
      url: req.url,
      method: req.method,
      headers: req.headers,
    });

    return new Response(result.html, {
      status: result.status ?? 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        ...Object.fromEntries(result.headers ?? []),
      },
    });

  } catch (err) {
    console.error("Server error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
