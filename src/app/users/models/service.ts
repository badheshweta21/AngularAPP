import { IUserData } from "./user";

export interface IUserQueryParams {
	results?: number;
	page?: number;
	seed?: string;
}

export interface IUserListResponse {
	results: IUserData[];
	info: {
		results: number;
		page: number;
		seed: string;
	}
}