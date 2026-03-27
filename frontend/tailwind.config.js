/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          deep: '#5b21b6',
          glow: '#a78bfa',
        },
        neon: {
          lime: '#39ff14',
          mint: '#00ffa3',
        },
      },
      fontFamily: {
        display: ['"Unbounded"', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(at 0% 0%, rgba(124,58,237,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(57,255,20,0.12) 0px, transparent 45%), radial-gradient(at 100% 100%, rgba(167,139,250,0.1) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
