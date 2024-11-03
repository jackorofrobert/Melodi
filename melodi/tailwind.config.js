/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '14px 15px 5px rgba(0, 0, 0, 0.3)', // Điều chỉnh độ dài và độ mờ của bóng
      }
    },
  },
  plugins: [],
}