import path from "path";
import fs from "fs";

export function getStaticRoutes(dir = path.join(process.cwd(), "src/app"), basePath = "") {
  let routes = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Skip dynamic directories (e.g., [slug])
      if (!file.name.startsWith("[") && !file.name.startsWith("api")) {
        routes = routes.concat(getStaticRoutes(filePath, path.join(basePath, file.name)));
      }
    } else if (file.name === "page.tsx") {
      // Add route path for valid static pages
      routes.push(basePath);
    }
  });

  return routes;
}
