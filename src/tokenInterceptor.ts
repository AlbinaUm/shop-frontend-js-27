import {store} from "./app/store.ts";
import {setAccessToken, unsetUser} from "./features/users/usersSlice.ts";
import axiosAPI from "./axiosApi.ts";


axiosAPI.interceptors.request.use(config => {
   const token = store.getState().users.accessToken;

   if (token) {
       config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});


axiosAPI.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401) {
        const originalRequest = error.config;
        originalRequest._retry = true;

        if (!originalRequest._retry) {
            try {
                const res = await axiosAPI.post('/users/refresh-token');
                const newToken = res.data.accessToken;
                store.dispatch(setAccessToken(newToken));
            } catch (e) {
                store.dispatch(unsetUser());
                return Promise.reject(e);
            }
        }
    }
    return Promise.reject(error);
});