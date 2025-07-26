import marked from "marked";
import { readFile, writeFile, access, mkdir } from "fs/promises";
import path from "path";
import {
  resumePath,
  distPath,
  stylePath,
  websocketPath,
} from "#root/config.js";

const renderer = {
  table(header, body) {
    return `<table>${body}</table>`;
  },
};

marked.use({ renderer });

export function decorateHtml(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="${stylePath}" type="text/css"></link>
      </head>
      <body class="markdown-body">
        <div id="custom">
          ${html}
        </div>
        <script src="${websocketPath}"></script>
      </body>
     </html>
`;
}

export async function exportMarkdown2Html() {
  const html = await convertMarkdown2Html();
  const content = decorateHtml(html);
  const dir = path.dirname(distPath);

  try {
    await access(dir);
  } catch (e) {
    await mkdir(dir);
  }
  await save(distPath, content);
}

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

async function save(dist, content) {
  try {
    await writeFile(dist, content);
  } catch (e) {
    console.log(e);
  }
}
