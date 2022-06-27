import { defineStore } from 'pinia';
import type {
  IUser,
  ILoginOAuthData,
} from '@/models/Auth';
import axios from '@/bootstrap/api-interceptor';
import AuthConfig from '@/configs/auth';

export interface IAuthState {
  token: null | string;
  expiredAt: null | number; // eslint-disable-line camelcase
  user: null | IUser;
}

const storageValue = localStorage.getItem(AuthConfig.TOKEN) || '{}';
const payloadToken = JSON.parse(storageValue);

const defaultState: IAuthState = {
  token: payloadToken.token,
  expiredAt: payloadToken.expiredAt,
  user: null,
};

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => defaultState,
  getters: {
    isLoggedIn: (state) => !!state.token
        && !!state.expiredAt
        && state.expiredAt > Date.now(),
    timeout: (state) => {
      if (!state.expiredAt) {
        return 0;
      }
      return Math.round((state.expiredAt - Date.now()) / 1000);
    },
    isReady: (state) => (route: any) => {
      const isUserRoute = route.matched
        .some((rc: any) => rc.meta.auth && rc.meta.auth !== false);

      if (isUserRoute) {
        return !!state.token;
      }

      return true;
    },
  },
  actions: {
    /**
     * OAuth with token
     */
    async login(payload: ILoginOAuthData) {
      if (!payload) {
        throw new Error('Payload is not valid');
      }

      localStorage.setItem(AuthConfig.TOKEN, JSON.stringify(payload));

      const { token, expiredAt } = payload;
      // TODO verify token
      this.token = token;
      this.expiredAt = expiredAt;

      this.registerAuthorizonzationHeader(token);
    },
    registerAuthorizonzationHeader(token: string | null) {
      // Set to local storage and axios
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    async refresh() {
      if (this.expiredAt && this.expiredAt > Date.now()) {
        this.registerAuthorizonzationHeader(this.token);
      } else {
        await axios
          .post('token/refresh', { token: this.token })
          .then(({ data }) => {
            this.login(data);
          });
      }
    },
    async logout() {
      localStorage.removeItem(AuthConfig.TOKEN);
      this.$reset();

      // TODO redirect user to login page
    },
    async getUser() {
      this.user = await axios.get('user');
    },
  },
});
