/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"], // Figyeli a HTML és JS fájlokat
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0f172a',    // Sötétkék
        'secondary-dark': '#1e293b',  // Kártya háttér (nem használt, mivel a body a gray-900)
        'accent-color': '#06b6d4',    // Élénk Cián (kiemelés)
        'text-light': '#f1f5f9',      // Világos szöveg
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}
