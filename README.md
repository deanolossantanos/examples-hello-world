Qwik SSR on Deno Deploy
This repository contains the production build output of a Qwik City application, packaged as a standalone Deno server for deployment on Deno Deploy.

📁 Project Structure
Code
dist/                 Static client assets (Qwik client build)
server/               Qwik SSR server bundle
  entry.deno.js       Self-contained Deno server (entrypoint)
package.json          Metadata only (not used for deployment)
README.md             This file
🚀 Running Locally
You can run the production server locally using Deno:

sh
deno run --allow-net --allow-read server/entry.deno.js
Then open:

Code
http://localhost:3009
🌐 Deploying to Deno Deploy
Set the entrypoint to:

Code
server/entry.deno.js
Deno Deploy will automatically start the server using:

ts
Deno.serve(...)
🛠 Development Workflow
This repository contains only the compiled output.
To continue developing the Qwik application, use the original source project that contains:

Code
src/
public/
vite.config.ts
tsconfig.json
Then rebuild:

sh
npm run build
And copy the updated dist/ and server/ folders into this repo.
