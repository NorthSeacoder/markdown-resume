import { resumePath } from "#root/config.js";
import { readFile, writeFile } from "fs/promises";
import browserSync from "browser-sync";
import marked from "marked";
import customHeadingId from "marked-custom-heading-id";
import path from "path";

const renderer = {
  table(header, body) {
    return `<table>${body}</table>`;
  },
};

marked.use({ renderer });
marked.use(customHeadingId());

export async function convertMarkdown2Html() {
  try {
    const data = await readFile(resumePath, "utf8");
    const html = await marked(data);
    return html;
  } catch (e) {
    console.log(e);
    return "";
  }
}

export async function exportMarkdown2Html() {
  const html = await convertMarkdown2Html();
  const content = decorateHtml(html);
  await save('./resume.html', content);
}

export function decorateHtml(html) {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/styles/index.css" type="text/css"></link>
      </head>
      <body class="markdown-body">
        <div id="custom">
          ${html}
        </div>
      </body>
     </html>
`;
}

async function save(dist, content) {
  try {
    await writeFile(dist, content);
  } catch (e) {
    console.log(e);
  }
}

exportMarkdown2Html();

browserSync({
  server: {
    baseDir: ".",
    index: "resume.html"
  },
  files: [
    {
      match: ["styles/*.css"],
      fn: () => {
        browserSync.reload("*.css");
      }
    },
    {
      match: [resumePath],
      fn: () => {
        exportMarkdown2Html();
        browserSync.reload();
      }
    }
  ]
});
