import defaultTheme from './default';

export default {
  default: defaultTheme  //默认的主题
}

export const overrides = {      //重写的一些主题
  typography: {
    h1: {
      fontSize: '3rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.64rem',
    },
    h4: {
      fontSize: '1.5rem',
    },
    h5: {
      fontSize: '1.285rem',
    },
    h6: {
      fontSize: '1.142rem',
    }
  }
};