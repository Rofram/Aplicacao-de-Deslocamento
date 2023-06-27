import { QUERY } from "@/constants";
import type { Condutor } from "@/entities";
import { createCondutor, deleteCondutor, getAllCondutores, updateCondutor } from "@/services/condutor.service";
import { getAxiosData } from "@/utils/getAxiosData";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from 'zod';

const createCondutorSchema = z.object({
  nome: z.string().nonempty("Campo Obrigatório"),
  numeroHabilitacao: z.string().nonempty("Campo Obrigatório"),
  catergoriaHabilitacao: z.string().nonempty("Campo Obrigatório"),
  vencimentoHabilitacao: z.string().nonempty("Campo Obrigatório"),
});

const updateCondutorSchema = z.object({
  id: z.coerce.number(),
  catergoriaHabilitacao: z.string().nonempty("Campo Obrigatório"),
  vencimentoHabilitacao: z.string().nonempty("Campo Obrigatório"),
});

export function useCondutorHook() {
  const [selectedCondutor, setSelectedCondutor] = useState<Condutor>();
  const [vencimentoHabilitacao, setVencimentoHabilitacao] = useState<Dayjs>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const { 
    data: condutores = [], 
    isLoading: isLoadingCondutores, 
    refetch 
  } = useQuery({ queryKey: [QUERY.ALL_CONDUTORES], queryFn: getAxiosData(getAllCondutores) });
  const queryClient = useQueryClient();
  const { 
    register: createRegister, 
    handleSubmit: createHandleSubmit, 
    formState: { errors: createErrors },
    reset: createReset,
    setValue: createSetValue
  } = useForm<z.infer<typeof createCondutorSchema>>({ resolver: zodResolver(createCondutorSchema) });
  const { 
    register: updateRegister, 
    handleSubmit: updateHandleSubmit, 
    formState: { errors: updateErrors },
    reset: updateReset,
    setValue: updateSetValue
  } = useForm<z.infer<typeof updateCondutorSchema>>({ resolver: zodResolver(updateCondutorSchema) });

  async function handleSync() {
    const toastRef = toast('Sincronizando condutores...', { isLoading: true, autoClose: false });
    const { status } = await refetch();
    if (status === 'success') {
      toast.update(toastRef, { type: toast.TYPE.INFO, render: 'Condutores sincronizados.', isLoading: false, autoClose: 2000 });
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao sincronizar condutores.', isLoading: false, autoClose: 2000 });
    }
  }

  const handleSubmitCreate = createHandleSubmit(async (data) => {
    const toastRef = toast('Cadastrando condutor...', { autoClose: false, isLoading: true }); 
    const { status } = await createCondutor({ ...data, categoriaHabilitacao: data.catergoriaHabilitacao }); // ajuste por causa da api retorna o objeto errado.
    if (status === 200) {
      toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Condutor cadastrado com sucesso!', isLoading: false, autoClose: 2000 });
      queryClient.invalidateQueries([QUERY.ALL_CONDUTORES]);
      handleCloseCreateModal();
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao cadastrar condutor!', isLoading: false, autoClose: 2000 });
    }
  })

  function handleChangeDateCreateModal(date: Dayjs | null) {
    if (date) {
      setVencimentoHabilitacao(date);
      createSetValue('vencimentoHabilitacao', date.toISOString());
    }
  }
  
  function handleOpenCreateModal() {
    setVencimentoHabilitacao(dayjs());
    createSetValue('vencimentoHabilitacao', dayjs().toISOString())
    setIsModalCreateOpen(true);
  }

  function handleCloseCreateModal() {
    setIsModalCreateOpen(false);
    createReset();
  }

  const handleSubmitUpdate = updateHandleSubmit(async (data) => {
    const toastRef = toast('Atualizando condutor...', { isLoading: true, autoClose: false });
    const { status } = await updateCondutor({ ...data, categoriaHabilitacao: data.catergoriaHabilitacao }); // ajuste por causa da api retorna o objeto errado.
    if (status === 200) {
      toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Condutor Atualizado com sucesso!', isLoading: false, autoClose: 2000  })
      queryClient.invalidateQueries([QUERY.ALL_CONDUTORES]);
      handleCloseEditModal();
    } else {
      toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao Atualizar condutor!', isLoading: false, autoClose: 2000 })
    }
  })

  function handleOpenEditModal(cliente: Condutor) {
    return () => {
      for (const [key, value] of Object.entries(cliente)) {
        updateSetValue(key as keyof z.infer<typeof updateCondutorSchema>, value);
        if (key === 'vencimentoHabilitacao') {
          setVencimentoHabilitacao(dayjs(value));
          updateSetValue('vencimentoHabilitacao', dayjs(value).toISOString())
        }
      }
      setIsModalEditOpen(true);
    }
  }

  function handleCloseEditModal() {
    setIsModalEditOpen(false);
    updateReset();
  }

  function handleOpenDeleteDialog(cliente: Condutor) {
    return () => {
      setSelectedCondutor(cliente);
      setIsDialogDeleteOpen(true);
    }
  }

  function handleCloseDeleteDialog() {
    setIsDialogDeleteOpen(false);
  }

  async function handleDeleteCondutor() {
    if (selectedCondutor) {
      const toastRef = toast('Deletando condutor...', { isLoading: true, autoClose: false  });
      const { status } = await deleteCondutor(selectedCondutor);
      if (status === 200) {
        toast.update(toastRef, { type: toast.TYPE.SUCCESS, render: 'Condutor deletado com sucesso!', isLoading: false, autoClose: 2000  })
        queryClient.invalidateQueries([QUERY.ALL_CONDUTORES]);
        handleCloseDeleteDialog();
      } else {
        toast.update(toastRef, { type: toast.TYPE.ERROR, render: 'Erro ao deletar condutor!', isLoading: false, autoClose: 2000  })
      }
    }
  }

  return {
    condutores,
    handleSync,
    isLoadingCondutores,
    selectedCondutor,
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
    handleDeleteCondutor,
    handleChangeDateCreateModal,
    vencimentoHabilitacao,
  };
}