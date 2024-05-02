module.exports = {
  // https://github.com/vercel/next.js/issues/21079
  // Remove this workaround whenever the issue is fixed
  env: {
    apiUrl: 'https://app.hashkifa.com',
    mapAPI: 'AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc',
    recaptchaKey: '6Le-7wgfAAAAACazNyPNrAm2zRZ4lJAUJx0A5BUU'
  },
  images: {
    loader: 'imgix',
    path: '',
  },
}