import { AxiosResponse } from "axios";

export interface Crud {
  create(data: any): Promise<AxiosResponse<any>>;
  read(): Promise<AxiosResponse<any>>;
  update(data: any): Promise<AxiosResponse<any>>;
  delete(data: any): Promise<AxiosResponse<any>>;
}