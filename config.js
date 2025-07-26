import path from "path"
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// update to your resume.md path
export const resumePath = path.resolve(__dirname, "./resume.md")
