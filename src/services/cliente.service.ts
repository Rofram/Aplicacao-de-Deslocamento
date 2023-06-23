import type { Cliente } from '@/entities';
import api from './api';

export type CreateClientePayload = Omit<Cliente, 'id'>;

export const createCliente = (payload: CreateClientePayload) => {
  return api.post("/Cliente", payload);
}

export type GetAllClientsResponse = Array<Cliente>;

export const getAllClientes = () => {
  return api.get<GetAllClientsResponse>("/Cliente");
}

export const getClienteById = (id: number) => {
  return api.get<Cliente>(`/Cliente/${id}`);
}

export type UpdateClientPayload = Omit<Cliente, 'numeroDocumento' | 'tipoDocumento'>;

export const updateCliente = (payload: UpdateClientPayload) => {
  return api.put(`/Cliente/${payload.id}`, payload);
}

export type DeleteClientePayload = Pick<Cliente, 'id'>;

export const deleteCliente = (payload: DeleteClientePayload) => {
  return api.delete(`/Cliente/${payload.id}`, { data: payload });
}

const crud = {
  create: createCliente,
  read: getAllClientes,
  update: updateCliente,
  delete: deleteCliente,
}

export default crud;