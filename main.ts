import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { render } from "./server/entry.deno.js";

console.log("🚀 Qwik SSR running on Deno Deploy");

serve(async (req) => {
  const result = await render({
    url: req.url,
    method: req.method,
    headers: req.headers,
  });

  return new Response(result.body, {
    status: result.status,
    headers: result.headers,
  });
});
