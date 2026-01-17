// main.ts
import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.201.0/http/file_server.ts";

serve(async (req) => {
  try {
    // Try to serve static file from repo root
    const res = await serveDir(req, {
      fsRoot: ".",
      urlRoot: "/",
      showDirListing: false,
    });

    // If serveDir returned 404, fall back to index.html (SPA)
    if (res.status === 404) {
      const body = await Deno.readFile("index.html");
      return new Response(body, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return res;
  } catch (err) {
    // Log error to stdout so Deploy logs show it, and return 500
    console.error("Server error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});
