import { UserState } from "./features/user.feature";
import { adminState } from "./features/admin.feature";

export interface AppState {
	user: UserState;
	admin: adminState;
}
