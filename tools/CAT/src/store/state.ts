import { UserState } from "./features/user.feature";
import { PageAdminState } from "./features/pagesAdmin.feature";

export interface AppState {
	user: UserState;
	pageAdmin: PageAdminState;
}
