// import { createLogger } from 'redux-logger';

export const dva = {
  config: {
    // onAction: createLogger(),
    onError(e) {
      e.preventDefault();
      // eslint-disable-next-line no-console
      console.error(e.message);
    },
  },
  plugins: [
  ],
};
