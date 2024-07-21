import { createSelector,createDraftSafeSelector } from "@reduxjs/toolkit";
import { selectAuthenticatedUser } from "../features/UserAuthSlice";

const userAuthState= (state) => state.userAuth;

export const authUserSelector=createDraftSafeSelector(userAuthState, 
    (userAuth) => userAuth.user
)