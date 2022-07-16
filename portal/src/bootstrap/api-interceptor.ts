import axios from 'axios';
import AppConfig from '../configs/app';

// interface IRequestConfig {
//   url: string;
//   method: string;
//   data?: any;
//   params?: any;
// }

const instance = axios.create({
  baseURL: AppConfig.API_URL,
  // baseURL: 'https://reqres.in/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use((config) => {
//   if (config.errorHandling) {
//     store.dispatch('serverError/clearErrors');
//   }
//
//   return config;
// });

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      // Do something with response error
      // 401 mean not authorized or token expired, should login again
      if (status === 401) {
        const { message } = error.response.data;
        // TODO show token expired dialog
        // TODO notify error
      } else if (status >= 400 && status <= 599) {
        if (error.config.errorHandling !== false) {
          const { errors } = error.response.data;
          let { message } = error.response.data;

          if (errors) {
            // TODO show server error
            // store.dispatch('serverError/setErrors', errors);
          }

          if (message && (error.config.errorMessageHandling !== false)) {
            if (status === 422) {
              const validationMsg = Object.keys(errors).map((key) => {
                const msg = errors[key].join('<br>');
                return `<p>${msg}</p>`;
              });

              message = `<div>${validationMsg}</div>`;
            }

            // TODO notify error
            // Vue.prototype.$notify({
            //   type: 'error',
            //   title: 'Something went wrong!',
            //   text: message,
            //   duration: 10000,
            // });
          }
        }
      } else {
        // TODO else
      }

      return Promise.reject(error.response.data);
    } else if (error.request) { // eslint-disable-line
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request); //eslint-disable-line
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message); //eslint-disable-line
    }

    return Promise.reject(error);
  },
);

export default instance;
