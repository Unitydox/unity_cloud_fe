export interface IRegisterUser {
	first_name: string;
	last_name: string;
	email: string;
	dob: Date;
	password: string;
	confirm_password: string;
	isTermsAccepted: boolean;
}

export interface IThirdPartyRegisterUser {
	first_name: string;
	last_name: string;
	email: string;
	user_login_type: "google" | "apple";
	profile_img_url?: string;
	third_party_ref_id: string;
	verified_email: boolean;
}

export interface ITokens {
	access: {
		token: string;
		expires: string; // You can use Date type if you parse it to a Date object
	};
	refresh: {
		token: string;
		expires: string; // You can use Date type if you parse it to a Date object
	};
}

export interface IPlanDetails {
	id: number;
	plan_name: string
	total_size: number;
	total_size_formatted: string;
	used_size: number;
	used_size_formatted: string;
}

export interface ITokensHttp {
	refresh_token: string;
	access_token: string;
}

export interface IUserDetails {
	id: number;
	uuid: string;
	first_name: string;
	last_name: string;
	email: string;
	dob: Date;
	address: string;
	phone_number: string;
	profile_img_url: boolean;
	user_login_type: string;
	created_at: Date;
	updated_at: Date;
}

export interface IProfileForm {
	uuid: string;
	first_name: string;
	last_name?: string;
	email: string;
	dob?: Date;
	address?: string;
	phone_number?: string;
	profile_img_url?: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IChangePassword {
	current_password: string;
	new_password: string;
	new_password_conf: string;
}
