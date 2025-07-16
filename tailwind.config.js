module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure this matches your project structure
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
};
