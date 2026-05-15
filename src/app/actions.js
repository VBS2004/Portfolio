"use server";
import fs from "fs";
import path from "path";

export async function getProjectImages() {
  const slugs = ["anycompare", "birdclef", "birdid", "rag", "cibmtr"];
  const result = {};

  slugs.forEach(slug => {
    try {
      const dirPath = path.join(process.cwd(), "public", "projects", slug);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        result[slug] = files
          .filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file))
          .map(file => `/projects/${slug}/${file}`);
      } else {
        result[slug] = [];
      }
    } catch (error) {
      result[slug] = [];
    }
  });

  return result;
}
