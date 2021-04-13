import { createSelector } from "reselect";

export const selectToken = (state) => state.session.currentUser.token;

export const selectCurrentUser = (state) => state.session.currentUser;

export const selectSessionState = (state) => state.session;

export const tokenSelector = createSelector([selectToken], (token) => token);

export const currentUserSelector = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser,
);

export const sessionStateSelector = createSelector(
  [selectSessionState],
  (sessionState) => sessionState,
);
