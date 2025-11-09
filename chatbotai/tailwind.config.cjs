/**
 * Tailwind configuration created manually because the project-installed
 * `tailwindcss` package doesn't expose a CLI binary in this setup
 * (so `npx tailwindcss init -p` failed).
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
