import { createAction } from "@reduxjs/toolkit";

import type { User } from "../../types/user.types";

export const setUser = createAction<User>("user/setUser");
export const clearUser = createAction("user/clearUser");
