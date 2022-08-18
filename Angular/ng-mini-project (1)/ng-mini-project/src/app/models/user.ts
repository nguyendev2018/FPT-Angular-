export interface User {
	username: string;
	password: string;
	email: string;
	fisrtName?: string;
	lastName?: string;
}

export interface UserResponse {
	username: string;
	email: string;
	firstName?: string;
	lastName?: string;
}
