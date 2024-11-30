import { createSelector } from 'reselect';

const authSelect = (state) => state.auth;

export const selectAuth = createSelector([authSelect], (auth) => auth);

export const selectUser = createSelector([authSelect], (auth) => auth.user);

export const isLoggedIn = createSelector([selectAuth], (auth) => auth.isLoggedIn);
