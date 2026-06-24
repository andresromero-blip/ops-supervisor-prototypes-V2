import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: '#54B282', dark: '#3d8f64', light: '#e8f7ef' },
      },
    },
  },
  plugins: [],
}
export default config
