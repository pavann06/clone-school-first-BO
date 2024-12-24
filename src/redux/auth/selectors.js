import { createSelector } from 'reselect';

const authSelect = (state) => state.auth;

export const selectAuth = createSelector([authSelect], (auth) => auth);

export const selectUser = createSelector([authSelect], (auth) => auth.user);

export const SelectIsLoggedIn = createSelector([authSelect], (auth) => auth.isLoggedIn);

export const SelectIsLoading = createSelector([authSelect], (auth) => auth.isLoading);
