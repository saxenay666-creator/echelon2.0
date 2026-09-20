/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3faf7',
          100: '#ddf3ec',
          200: '#b9e5d8',
          300: '#8dd1bd',
          400: '#54b59a',
          500: '#198f7a',
          600: '#198f7a',
          700: '#117565',
          800: '#0d5d52',
          900: '#123047',
          950: '#0b2436',
        },
        echelon: {
          teal: '#198f7a',
          tealDark: '#117565',
          navy: '#123047',
          muted: '#526979',
          mint: '#ddf3ec',
          indigo: '#6f72d8',
          amber: '#e6a23c',
          coral: '#e85b63',
          card: '#fcfefd',
          bg: '#f7faf9',
          border: '#dce8e4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px rgba(79, 70, 229, 0.15)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
