import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { DIGIO_HTTP_CLIENT } from './app/constants';

@Injectable()
export class AppService {

  constructor(
    @Inject(DIGIO_HTTP_CLIENT)
    private digioHttpclient: AxiosInstance
  ) {}

  async getDocument(id: string) {
    try {
      const { data } = await this.digioHttpclient.get(`/v2/client/document/${id}`);
      return data;
    } catch (error) {
      return error;
    }
  }

  async downloadDocument(id: string) {
    try {
      const { data } = await this.digioHttpclient.get(`/v2/client/document/download`, {
        params: {
          document_id: id
        }
      });
      return data;
    } catch (error) {
      console.log(error.response);
      return error;
    }
  }

  async uploadDocument(uploadRequest: any): Promise<any> {
    try {
      const { data } = await this.digioHttpclient.post(`/v2/client/document/uploadpdf`, uploadRequest, {
        headers: {
          'content-type': 'application/json'
        }
      });
      console.log({data});
      return data;
    } catch (error) {
      return error;
    }

  }
}
