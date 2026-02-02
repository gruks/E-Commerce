/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#f1efe7',
        'bg-secondary': '#f7f5ef',
        'bg-tertiary': '#fbfaf7',
        
        // Text colors
        'text-primary': '#000000',
        'text-secondary': '#2a2a2a',
        'text-muted': '#6f6f6f',
        'text-subtle': '#9a9a9a',
        
        // Brand colors
        'brand-primary': '#fc6902',
        'brand-hover': '#e85f02',
        'brand-soft': '#ffe2cf',
        'brand-softer': '#fff1e6',
        
        // Surface colors
        'surface-primary': '#fbfaf7',
        'surface-secondary': '#f7f5ef',
        
        // Border colors
        'border-default': '#e2ded4',
        'border-hover': '#d6d1c6',
        'border-focus': '#fc6902',
        
        // State colors
        'success': '#5f8f6a',
        'success-bg': '#e7f1ea',
        'error': '#c96a5a',
        'error-bg': '#f6e4e1',
        'warning': '#d6a44c',
        'warning-bg': '#faf1dd',
        'info': '#6b8ca3',
        'info-bg': '#e8f0f5',
        
        // Disabled states
        'disabled-bg': '#e9e6de',
        'disabled-text': '#9a9a9a',
        'disabled-border': '#dedacf',
      },
      fontFamily: {
        'heading': ['var(--font-league-spartan)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
        'spartan': ['var(--font-league-spartan)', 'system-ui', 'sans-serif'],
        'quicksand': ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 6px 16px rgba(0,0,0,0.06)',
        'lg': '0 12px 32px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}