import { createAction } from "@reduxjs/toolkit";
import { User } from "./user.types";

export const setUser = createAction<User>("user/setUser");
export const clearUser = createAction("user/clearUser");
