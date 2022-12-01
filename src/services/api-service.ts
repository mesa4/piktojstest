import type {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	AxiosRequestConfig
} from 'axios';

import axios from 'axios';

const API_CONFIG = {
	baseURL: ''
};

class Api {
	private instance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.instance = axios.create(config);
		this.instance.interceptors.response.use(Api.onResponse, this.onRejected);
		this.instance.interceptors.request.use(Api.onRequest);
	}

	private static onRequest(params: any) {
		return params;
	}

	private static onResponse(response: AxiosResponse) {
		return response.data;
	}

	private onRejected = async (error: AxiosError) => {
		return Promise.reject(error.response?.data);
	}

	public get(url: string, data?: any): any {
		return this.instance.get(url, { params: data });
	}

	public post(url: string, data?: any, config?: object): any {
		return this.instance({
			method: 'post',
			url: url,
			data,
			...config
		});
	}
}

const api = new Api(API_CONFIG);

export {
	api
};
