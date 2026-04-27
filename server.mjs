import { serve } from "srvx";
import { serveStatic } from "srvx/static";
import handler from "./dist/server/server.js";

const port = Number(process.env.PORT) || 5000;

serve({
  port,
  hostname: "0.0.0.0",
  middleware: [
    serveStatic({ dir: "./dist/client" }),
  ],
  fetch: (request) => handler.fetch(request),
});
