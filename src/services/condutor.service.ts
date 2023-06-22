import type { Condutor } from '@/interfaces';
import api from './api';

export type CreateCondutorPayload = Omit<Condutor, 'id'>;

export const createCondutor = (payload: CreateCondutorPayload) => {
  return api.post("/Condutor", payload);
}

export type GetAllCondutoresResponse = Array<Condutor>;

export const getAllCondutores = () => {
  return api.get<GetAllCondutoresResponse>("/Condutor");
}

export const GetCondutorById = (id: number) => {
  return api.get<Condutor>(`/Condutor/${id}`);
}

export type UpdateCondutorPayload = Omit<Condutor, 'nome' | 'numeroHabilitacao'>;

export const updateCondutor = (payload: UpdateCondutorPayload) => {
  return api.put(`/Condutor/${payload.id}`, payload);
}

export type DeleteCondutorPayload = Pick<Condutor, 'id'>;

export const deleteCondutor = (payload: DeleteCondutorPayload) => {
  return api.delete(`/Condutor/${payload.id}`, { data: payload });
}

const crud = {
  create: createCondutor,
  read: getAllCondutores,
  update: updateCondutor,
  delete: deleteCondutor,
}

export default crud;