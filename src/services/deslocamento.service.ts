import { Deslocamento } from '@/interfaces';
import api from './api';

export type CreateDeslocamentoPayload = Omit<Deslocamento, 'id' | 'kmFinal' | 'fimDeslocamento'>;

export const createDeslocamento = (payload: CreateDeslocamentoPayload) => {
  return api.post("/Deslocamento/IniciarDeslocamento", payload);
}

export type GetAllDeslocamentosResponse = Array<Deslocamento>;

export const getAllDeslocamentos = () => {
  return api.get<GetAllDeslocamentosResponse>("/Deslocamento");
}

export const getDeslocamentoById = (id: number) => {
  return api.get<Deslocamento>(`/Deslocamento/${id}`);
}

export type DeleteDeslocamentoPayload = Pick<Deslocamento, 'id'>;

export const deleteDeslocamento = (payload: DeleteDeslocamentoPayload) => {
  return api.delete(`/Deslocamento/${payload.id}`, { data: payload });
}

export type EncerrarDeslocamentoPayload = Pick<Deslocamento, 'id' | 'kmFinal' | 'fimDeslocamento' | 'observacao'>;

export const encerrarDeslocamento = (payload: EncerrarDeslocamentoPayload) => {
  return api.put(`/Deslocamento/${payload.id}/EncerrarDeslocamento`, payload);
}

const crud = {
  create: createDeslocamento,
  read: getAllDeslocamentos,
  update: encerrarDeslocamento,
  delete: deleteDeslocamento,
}

export default crud;