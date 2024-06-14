module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        floatDown: {
          '0%': {transform: 'translate(-50%, -150px)'},
          '100%': { transform: 'translate(-50%, 0px)' },
        },
        rollingBack: {
          'to': {width: "0"}
        }
      },
      animation: {
        floatDown: 'floatDown 1s ease-in-out',
      }
    },
  },
  plugins: [],
}