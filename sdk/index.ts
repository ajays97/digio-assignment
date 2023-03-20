import axios, { AxiosInstance } from "axios";
import * as config from './constants';

export class Digio {

    private digioClient: AxiosInstance;

    constructor(_options?: any) {
        this.digioClient = axios.create({
            baseURL: config.SERVICE_BASE_URL
        });
    }

    getConfig() {
        return config;
    }

    async getDocument(id: string) {
        const { data } = await this.digioClient.get(`/client/document/${id}`);
        return data;
    }

    async downloadDocument(documentId: string) {
        const { data } = await this.digioClient.get(`/client/document/download`, {
            params: {
                documentId
            }
        });
        return data;
    }

    async uploadDocument(uploadRequest: any) {
        const { data } = await this.digioClient.post(`/client/document/upload`, uploadRequest);
        return data;
    }
}