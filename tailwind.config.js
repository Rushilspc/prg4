/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hot-pink': '#FF00FF',
        'lime-green': '#32CD32',
        'electric-blue': '#00FFFF',
        'void-black': '#0a0a0a',
        'neon-purple': '#9D00FF',
        'arcade-yellow': '#FFE500',
      },
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'glitch': ['"Rubik Glitch"', 'cursive'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px #000000',
        'brutal-sm': '4px 4px 0px 0px #000000',
        'brutal-lg': '12px 12px 0px 0px #000000',
        'neon-pink': '0 0 20px #FF00FF, 0 0 40px #FF00FF',
        'neon-blue': '0 0 20px #00FFFF, 0 0 40px #00FFFF',
        'neon-green': '0 0 20px #32CD32, 0 0 40px #32CD32',
      },
      animation: {
        'glitch': 'glitch 1s infinite',
        'pulse-neon': 'pulse-neon 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
    },
  },
  plugins: [],
}
