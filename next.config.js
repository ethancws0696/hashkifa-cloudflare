module.exports = {
  // https://github.com/vercel/next.js/issues/21079
  // Remove this workaround whenever the issue is fixed
  env: {
    apiUrl: 'https://app-staging.hashkifa.com',
    mapAPI: 'AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc',
    recaptchaKey: '6Lf3hM4pAAAAAHaxas-fSDXRZ7guRr4GOpDJzjxB'
  },
  images: {
    loader: 'imgix',
    path: '',
  },
}