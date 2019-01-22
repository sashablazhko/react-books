import { createSelector } from "reselect";

const expirationDateGetter = state => state.auth.user.expirationDate;

export const isAuthorizedSelector = createSelector(
  expirationDateGetter,
  expirationDate => {
    return parseInt(Date.now() / 1000, 10) < expirationDate;
  }
);