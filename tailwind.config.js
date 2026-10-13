/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Identité PLANETECH : vert profond + vert signal, sur blanc
        forest: {
          50: '#EEF6F1',
          100: '#D6E9DE',
          200: '#A9D2BC',
          300: '#6FB392',
          400: '#3C8F6B',
          500: '#1F7350',
          600: '#125C3E',
          700: '#0B4A32',
          800: '#073626',
          900: '#04251A',
        },
        signal: '#22B573', // vert vif : CTA, soulignements, états actifs
        ink: '#0F1A16',    // texte principal
        slate: {
          muted: '#5B6B63', // texte secondaire
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { prose: '68ch' },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(11, 74, 50, 0.45)',
      },
      backgroundImage: {
        // Trame discrète évoquant un réseau fibre (utilisée sur le hero)
        fiber:
          'repeating-linear-gradient(115deg, rgba(34,181,115,0.10) 0px, rgba(34,181,115,0.10) 1px, transparent 1px, transparent 26px)',
      },
    },
  },
  plugins: [],
};
