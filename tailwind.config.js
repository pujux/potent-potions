module.exports = {
  content: ["./pages/*.{js,ts,jsx,tsx}", "./components/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        dash: {
          "0%": {
            strokeDasharray: "0, 150",
            opacity: "1",
            stroke: "#2185d0",
          },
          "100%": {
            strokeDasharray: "120",
          },
        },
      },
      animation: {
        spinnerTimer: "dash 5s linear infinite",
        rainbow: "rainbow 5s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
