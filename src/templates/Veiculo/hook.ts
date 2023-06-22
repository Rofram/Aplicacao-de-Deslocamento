import { QUERY } from "@/constants";
import { Veiculo } from "@/interfaces";
import { createVeiculo, deleteVeiculo, getAllVeiculos, updateVeiculo } from "@/services/veiculo.service";
import { getAxiosData } from "@/utils/getAxiosData";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from 'zod';

const createVeiculoSchema = z.object({
  marcaModelo: z.string().min(1, "Campo Obrigatório"),
  placa: z.string().min(1, "Campo Obrigatório"),
  anoFabricacao: z.coerce.number().min(1, "Campo Obrigatório"),
  kmAtual: z.coerce.number().min(0, "Campo Obrigatório"),
});

const updateVeiculoSchema = z.object({
  id: z.coerce.number(),
  marcaModelo: z.string().min(1, "Campo Obrigatório"),
  anoFabricacao: z.coerce.number().min(1, "Campo Obrigatório"),
  kmAtual: z.coerce.number().min(0, "Campo Obrigatório"),
});

export function useVeiculoHook() {
  const [selectedVeiculo, setSelectedVeiculo] = useState<Veiculo>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const { data, isLoading } = useQuery({ queryKey: [QUERY.ALL_VEICULOS], queryFn: getAxiosData(getAllVeiculos) });
  const queryClient = useQueryClient();
  const { 
    register: createRegister, 
    handleSubmit: createHandleSubmit, 
    formState: { errors: createErrors },
    reset: createReset,
  } = useForm<z.infer<typeof createVeiculoSchema>>({ resolver: zodResolver(createVeiculoSchema) });
  const { 
    register: updateRegister, 
    handleSubmit: updateHandleSubmit, 
    formState: { errors: updateErrors },
    reset: updateReset,
    setValue: updateSetValue
  } = useForm<z.infer<typeof updateVeiculoSchema>>({ resolver: zodResolver(updateVeiculoSchema) });

  const handleSubmitCreate = createHandleSubmit(async (data) => {
    const toastRef = toast('Cadastrando veiculo...', { autoClose: false, isLoading: true }); 
    const { status } = await createVeiculo(data);
    if (status === 200) {
      toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Veiculo cadastrado com sucesso!', isLoading: false, autoClose: 2000 });
      queryClient.invalidateQueries([QUERY.ALL_VEICULOS]);
      handleCloseCreateModal();
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao cadastrar veiculo!', isLoading: false, autoClose: 2000 });
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
    const toastRef = toast('Atualizando condutor...', { isLoading: true, autoClose: false });
    const { status } = await updateVeiculo(data);
    if (status === 200) {
      toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Condutor Atualizado com sucesso!', isLoading: false, autoClose: 2000  })
      queryClient.invalidateQueries([QUERY.ALL_VEICULOS]);
      handleCloseEditModal();
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao Atualizar condutor!', isLoading: false, autoClose: 2000 })
    }
  })

  function handleOpenEditModal(cliente: Veiculo) {
    return () => {
      for (const [key, value] of Object.entries(cliente)) {
        updateSetValue(key as keyof z.infer<typeof updateVeiculoSchema>, value);
      }
      setIsModalEditOpen(true);
    }
  }

  function handleCloseEditModal() {
    setIsModalEditOpen(false);
    updateReset();
  }

  function handleOpenDeleteDialog(cliente: Veiculo) {
    return () => {
      setSelectedVeiculo(cliente);
      setIsDialogDeleteOpen(true);
    }
  }

  function handleCloseDeleteDialog() {
    setIsDialogDeleteOpen(false);
  }

  async function handleDeleteVeiculo() {
    if (selectedVeiculo) {
      const toastRef = toast('Deletando veiculo...', { isLoading: true, autoClose: false  });
      const { status } = await deleteVeiculo(selectedVeiculo);
      if (status === 200) {
        toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Veiculo deletado com sucesso!', isLoading: false, autoClose: 2000  })
        queryClient.invalidateQueries([QUERY.ALL_VEICULOS]);
        handleCloseDeleteDialog();
      } else {
        toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao deletar veiculo!', isLoading: false, autoClose: 2000  })
      }
    }
  }
  
  return {
    veiculos: data ?? [],
    isVeiculosLoading: isLoading,
    selectedVeiculo,
    isModalCreateOpen,
    isModalEditOpen,
    isDialogDeleteOpen,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleCloseEditModal,
    handleOpenEditModal,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    createRegister,
    handleSubmitCreate,
    createErrors,
    updateRegister,
    handleSubmitUpdate,
    updateErrors,
    handleDeleteVeiculo,
  };
}