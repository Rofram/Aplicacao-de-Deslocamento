import { AxiosResponse } from 'axios';

export function getAxiosData<TData>(fn: () => Promise<AxiosResponse<TData>>) {
  return () => fn().then(res => res.data);
}
