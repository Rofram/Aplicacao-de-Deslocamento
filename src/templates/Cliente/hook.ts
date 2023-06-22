import { QUERY } from "@/constants";
import { Cliente } from "@/interfaces";
import { createCliente, deleteCliente, getAllClientes, updateCliente } from "@/services/cliente.service";
import { getAxiosData } from "@/utils/getAxiosData";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from 'zod';

const createClienteSchema = z.object({
  nome: z.string().min(1, "Campo Obrigatório"),
  numeroDocumento: z.string().min(1, "Campo Obrigatório"),
  tipoDocumento: z.string().min(1, "Campo Obrigatório"),
  logradouro: z.string().min(1, "Campo Obrigatório"),
  numero: z.string().min(1, "Campo Obrigatório"),
  bairro: z.string().min(1, "Campo Obrigatório"),
  cidade: z.string().min(1, "Campo Obrigatório"),
  uf: z.string().min(1, "Campo Obrigatório"),
});

const updateClienteSchema = z.object({
  id: z.coerce.number(),
  nome: z.string().min(1, "Campo Obrigatório"),
  logradouro: z.string().min(1, "Campo Obrigatório"),
  numero: z.string().min(1, "Campo Obrigatório"),
  bairro: z.string().min(1, "Campo Obrigatório"),
  cidade: z.string().min(1, "Campo Obrigatório"),
  uf: z.string().min(1, "Campo Obrigatório"),
});

export function useClienteHook() {
  const [selectedCliente, setSelectedCliente] = useState<Cliente>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const { data, isLoading } = useQuery({ queryKey: [QUERY.ALL_CLIENTES], queryFn: getAxiosData(getAllClientes) });
  const queryClient = useQueryClient();
  const { 
    register: createRegister, 
    handleSubmit: createHandleSubmit, 
    formState: { errors: createErrors },
    reset: createReset
  } = useForm<z.infer<typeof createClienteSchema>>({ resolver: zodResolver(createClienteSchema) });
  const { 
    register: updateRegister, 
    handleSubmit: updateHandleSubmit, 
    formState: { errors: updateErrors },
    reset: updateReset,
    setValue: updateSetValue
  } = useForm<z.infer<typeof updateClienteSchema>>({ resolver: zodResolver(updateClienteSchema) });

  const handleSubmitCreate = createHandleSubmit(async (data) => {
    const toastRef = toast('Criando cliente...', { isLoading: true, autoClose: false });
    const { status } = await createCliente(data);
    if (status === 200) {
      toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Cliente criado com sucesso!', isLoading: false, autoClose: 2000 });
      queryClient.invalidateQueries([QUERY.ALL_CLIENTES]);
      handleCloseCreateModal();
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao criar cliente!', isLoading: false, autoClose: 2000 });
    }
  })
  
  function handleOpenCreateModal() {
    setIsModalCreateOpen(true);
  }

  function handleCloseCreateModal() {
    setIsModalCreateOpen(false);
    createReset();
  }

  const handleSubmitUpdate = updateHandleSubmit(async (data) => {
    const toastRef = toast('Atualizando cliente...', { isLoading: true, autoClose: false });
    const { status } = await updateCliente(data);
    if (status === 200) {
      toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Cliente atualizado com sucesso!', isLoading: false, autoClose: 2000 });
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao atualizar cliente!', isLoading: false, autoClose: 2000 });
    }
    queryClient.invalidateQueries([QUERY.ALL_CLIENTES]);
    handleCloseEditModal();
  })

  function handleEditClient(cliente: Cliente) {
    return () => {
      for (const [key, value] of Object.entries(cliente)) {
        updateSetValue(key as keyof z.infer<typeof updateClienteSchema>, value);
      }
      setIsModalEditOpen(true);
    }
  }

  function handleCloseEditModal() {
    setIsModalEditOpen(false);
    updateReset();
  }

  function handleOpenDeleteDialog(cliente: Cliente) {
    return () => {
      setSelectedCliente(cliente);
      setIsDialogDeleteOpen(true);
    }
  }

  function handleCloseDeleteDialog() {
    setIsDialogDeleteOpen(false);
  }

  async function handleDeleteCliente() {
    if (selectedCliente) {
      const toastRef = toast('Deletando cliente...', { autoClose: false, isLoading: true });
      const { status } = await deleteCliente(selectedCliente);
      if (status === 200) {
        toast.update(toastRef, { type: "success", render: 'Cliente deletado com sucesso!', isLoading: false, autoClose: 2000 });
      } else {
        toast.update(toastRef, { type: "error", render: 'Erro ao deletar cliente!', isLoading: false, autoClose: 2000 });
      }
      queryClient.invalidateQueries([QUERY.ALL_CLIENTES]);
      handleCloseDeleteDialog();
    }
  }

  return {
    clientes: data ?? [],
    isClientesLoading: isLoading,
    selectedCliente,
    isModalCreateOpen,
    isModalEditOpen,
    isDialogDeleteOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCloseEditModal,
    handleEditClient,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    createRegister,
    handleSubmitCreate,
    createErrors,
    updateRegister,
    handleSubmitUpdate,
    updateErrors,
    handleDeleteCliente,
  };
}