import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
  const file = await serveFile(req, "./index.html");
  return new Response(file.body, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
});
