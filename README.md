# Get Started
```bash
git clone https://github.com/Spike-Leung/markdown-resume.git
cd markdown-resume
pnpm i

# edit resume
vim resume.md

# preview with hot reload
pnpm run start
```

# Edit Resume
- You can fork this repo, and edit `markdown-resume/resume.md`
- Or write your own `resume.md`, and change `resumePath` variable in `config.js`

# Custom style
- Edit files in `styles` to custom your resume style, use `#custom` selector, or make it yourself.
- You can custom the heading's id with [marked-custom-heading-id](https://github.com/markedjs/marked-custom-heading-id).

# Export to pdf
- `pnpm run start`
- Print it as pdf (You may need to set some printing options)

# Preview
- [[resume.pdf]](./screenshot/resume.pdf)

# FAQ
## Where to get icon?
Check out [GitHub Emoji Picker](https://github-emoji-picker.rickstaa.dev/) !

Find the icon you want,  copy the shortcode and paste to your resume.md, that's it :blush:
