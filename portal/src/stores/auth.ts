import { defineStore } from 'pinia';
import type { ILoginOAuthData, IUser } from '@/models/Auth';
import axios from '@/bootstrap/api-interceptor';
import AuthConfig from '@/configs/auth';
import { GET_USER, REFRESH_TOKEN } from '@/configs/api';

export interface IAuthState {
  token: null | string;
  expiredAt: null | number;
  user: null | IUser;
}

const storageValue = localStorage.getItem(AuthConfig.TOKEN) || '{}';
const payloadToken = JSON.parse(storageValue);
const getExpiredAt = (expiresIn) => Date.now() + expiresIn * 1000;

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
      return state.expiredAt - Date.now() - 60 * 1000; // 60s before JWT TTL
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

      const { token, expiresIn } = payload;

      this.token = token;
      this.expiredAt = getExpiredAt(expiresIn);

      const storageToken = {
        token: this.token,
        expiredAt: this.expiredAt,
      };
      localStorage.setItem(AuthConfig.TOKEN, JSON.stringify(storageToken));

      this.registerAuthorizonzationHeader(token);
    },
    registerAuthorizonzationHeader(token: string | null) {
      // Set to local storage and axios
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    async refresh() {
      return axios
        .post(REFRESH_TOKEN, {}, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((data) => {
          const { token, expires_in: expiresIn } = data;
          const payload: ILoginOAuthData = {
            token,
            expiresIn,
          };
          return this.login(payload);
        });
    },
    async logout() {
      localStorage.removeItem(AuthConfig.TOKEN);
      this.$reset();

      // TODO redirect user to login page
    },
    async getUser() {
      this.user = await axios.get(GET_USER);
    },
  },
});
