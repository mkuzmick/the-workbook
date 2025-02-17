import path from "path";
import fs from "fs";

export default function getStaticRoutes(dir = path.join(process.cwd(), "src/app"), basePath = "") {
  let routes = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Skip dynamic directories (e.g., [slug]) and API routes
      if (!file.name.startsWith("[") && !file.name.startsWith("api")) {
        routes = routes.concat(getStaticRoutes(filePath, path.join(basePath, file.name)));
      }
    } else if (file.name === "page.tsx") {
      // Only push valid paths (skip empty basePath)
      if (basePath.trim() !== "") {
        routes.push(basePath);
      } else {
        routes.push("/"); // Explicitly add home as "/"
      }
    }
  });

  return routes;
}
