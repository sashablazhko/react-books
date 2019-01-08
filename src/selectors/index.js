import { createSelector } from "reselect";

const expirationDateGetter = state => state.auth.user.expirationDate;

export const isAuthorizedSelector = createSelector(
  expirationDateGetter,
  expirationDate => {
    return new Date() < expirationDate;
  }
);
