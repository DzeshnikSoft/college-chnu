import { AdminState } from "./features/admin.feature";
import { UserState } from "./features/user.feature";

export interface AppState {
	user: UserState;
	admin: AdminState;
}
