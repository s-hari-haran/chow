import { createRequestHandler } from "@netlify/remix-adapter";

export default async (request) => {
  const { default: handler } = await import("../../dist/server/server.js");
  return handler.fetch(request);
};

export const config = {
  path: "/*",
  preferStatic: true,
};
