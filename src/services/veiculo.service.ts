import type { Veiculo } from '@/entities';
import api from './api';

export type CreateVeiculoPayload = Omit<Veiculo, 'id'>;

export const createVeiculo = (payload: CreateVeiculoPayload) => {
  return api.post("/Veiculo", payload);
}

export type GetAllVeiculosResponse = Array<Veiculo>

export const getAllVeiculos = () => {
  return api.get<GetAllVeiculosResponse>("/Veiculo");
}

export const getVeiculoById = (id: number) => {
  return api.get<Veiculo>(`/Veiculo/${id}`);
}

export type UpdateVeiculoPayload = Omit<Veiculo, 'placa'>;

export const updateVeiculo = (payload: UpdateVeiculoPayload) => {
  return api.put(`/Veiculo/${payload.id}`, payload);
}

export type DeleteVeiculoPayload = Pick<Veiculo, 'id'>;

export const deleteVeiculo = (payload: DeleteVeiculoPayload) => {
  return api.delete(`/Veiculo/${payload.id}`, { data: payload });
}

const crud = {
  create: createVeiculo,
  read: getAllVeiculos,
  update: updateVeiculo,
  delete: deleteVeiculo,
}

export default crud;