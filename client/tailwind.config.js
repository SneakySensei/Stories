module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        background: "#F2F2F2",
        primary: "#7CB3BE",
        accent: "#DDE3E9",
        accentDark: "#D2D8DD",
        secondary: "#93B7F7",
        secondaryAccent: "#BCCBFF",
      },
      height: {
        "1/10": "10%",
        "1/5": "20%",
        "4/5": "80%",
        "9/10": "90%",
      },
      maxWidth: {
        "7/10": "70%",
      },
      maxHeight: {
        "1/10": "10vh",
        "1/5": "20vh",
        "4/5": "80vh",
        "9/10": "90vh",
      },
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      boxShadow: {
        card:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0,0,0,.12);",
      },
    },
    variants: {},
    plugins: [],
  },
};
