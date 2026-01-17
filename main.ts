import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import { fetch as appFetch } from "./server/entry.deno.js";

console.log("🚀 Qwik SSR running on Deno Deploy");

serve(appFetch);

