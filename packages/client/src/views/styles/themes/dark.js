const breakpoints = ['576px', '768px', '992px', '1200px'];

breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const darkTheme = {
  name: 'dark',
  borders: {
    primary: '1px solid #6237C6',
    light: '1px solid #EFF1F3',
    dark: '1px solid #393444',
  },
  typography: {
    fontFamily: '"Fira Code", monospace',
    fontSize: '18px',
    lineHeight: 1.45,
    fontWeight: '400',
    h1: {
      fontSize: '3.052rem',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"Fira Code", monospace',
    },
    h2: {
      fontSize: '2.441rem',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"Fira Code", monospace',
    },
    h3: {
      fontSize: '1.953rem',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"Fira Code", monospace',
    },
    h4: {
      fontSize: '1.563rem',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"Fira Code", monospace',
    },
    h5: {
      fontSize: '1.25rem',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"Fira Code", monospace',
    },
    h6: {
      fontSize: '1rem',
      lineHeight: 1.15,
      fontWeight: 700,
      fontFamily: '"Fira Code", monospace',
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.45,
      fontWeight: 400,
      fontFamily: '"Fira Code", monospace',
    },
    caption: {
      fontSize: '.8rem',
      lineHeight: 1.45,
      fontWeight: 400,
      fontFamily: '"Fira Code", monospace',
    },
  },
  colors: {
    primary: '#6237C6',
    secondary: '#D63646',
    dark: '#0F081E',
    lightDark: '#393444',
    light: '#EFF1F3',
    lighter: '#FBFFF9',
    error: '#FF3C38',
    success: '#78BE20',
    warning: '#FFCA1E',
    placeholder: '#A9AEB1',
    text: '#EFF1F3',
    background: '#0F081E',
    border: '#393444',
    disabledBG: '#171320',
    disabledText: '#393444',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  breakpoints,
};

export default darkTheme;
