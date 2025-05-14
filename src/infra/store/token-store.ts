export interface ITokenStore {
  access_token: string;
  expires_in: number;
}

interface IKey {
  user_id: string;
}

export const TokenStore = (() => {
  const store = new WeakMap<IKey, ITokenStore>();

  if (!process.env.APPLICATION_USER_ID) {
    throw new Error("Application user id not found");
  }

  const KEY: IKey = {
    user_id: process.env.APPLICATION_USER_ID,
  };

  return {
    getToken() {
      return store.get(KEY);
    },
    setToken(token: ITokenStore) {
      store.set(KEY, token);
    },
    verifyIfTheTokenIsStillValid(): boolean {
      if (this.hasToken()) {
        const isItStillValid = this.getToken()!.expires_in > new Date().getTime();

        if (isItStillValid) {
          return true;
        }

        this.clearToken();
        
        return false;
      }

      return false;
    },
    hasToken(): boolean {
      return store.has(KEY);
    },
    clearToken() {
      store.delete(KEY);
    }
  }
})();
