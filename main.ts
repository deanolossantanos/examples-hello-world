import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.201.0/http/file_server.ts";

serve(async (req) => {
  // Serve static files from repo root; change to "./public" if you move files there
  const url = new URL(req.url);
  // If you want SPA fallback to index.html:
  const res = await serveDir(req, { fsRoot: ".", urlRoot: "/", showDirListing: false });
  // If serveDir returned 404 for a path, return index.html for SPA routes
  if (res.status === 404) {
    try {
      const body = await Deno.readFile("index.html");
      return new Response(body, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    } catch {
      return res;
    }
  }
  return res;
});
