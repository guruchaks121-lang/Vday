import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0b0b0c',
        surface: '#151518',
        accent: '#d8c3a5',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
} satisfies Config;
