import { QUERY } from "@/constants";
import type { Deslocamento } from "@/entities";
import { getAllClientes } from "@/services/cliente.service";
import { getAllCondutores } from "@/services/condutor.service";
import { createDeslocamento, deleteDeslocamento, encerrarDeslocamento, getAllDeslocamentos } from "@/services/deslocamento.service";
import { getAllVeiculos } from "@/services/veiculo.service";
import { getAxiosData } from "@/utils/getAxiosData";
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { z } from 'zod';

const inputSelect = z.object({
  label: z.string(),
  id: z.number(),
})

const createDeslocamentoSchema = z.object({
  kmInicial: z.coerce.number().nonnegative("Valor não pode ser negativo"),
  inicioDeslocamento: z.string().nonempty("Campo Obrigatório"),
  checkList: z.string().nonempty("Campo Obrigatório"),
  motivo: z.string().nonempty("Campo Obrigatório"),
  observacao: z.string().nonempty("Campo Obrigatório"),
  idCondutor: z.string().nonempty("Campo Obrigatório"),
  idVeiculo: z.string().nonempty("Campo Obrigatório"),
  idCliente: z.string().nonempty("Campo Obrigatório"),
});

const updateDeslocamentoSchema = z.object({
  id: z.coerce.number(),
  kmFinal: z.coerce.number().min(0, "Campo Obrigatório"),
  fimDeslocamento: z.string().min(1, "Campo Obrigatório"),
  observacao: z.string().min(1, "Campo Obrigatário"),
});

export function useDeslocamentoHook() {
  const [selectedDeslocamento, setSelectedDeslocamento] = useState<Deslocamento>();
  const [inicioDeslocamento, setInicioDeslocamento] = useState<Dayjs>();
  const [fimDeslocamento, setFimDeslocamento] = useState<Dayjs>();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const { 
    data: deslocamentos = [], 
    isLoading: isLoadingDeslocamentos, 
    refetch: refetchDeslocamentos,
  } = useQuery({ queryKey: [QUERY.ALL_DESLOCAMENTOS], queryFn: getAxiosData(getAllDeslocamentos) });
  const { 
    data: condutores = [],
    refetch: refetchCondutores,
  } = useQuery({ queryKey: [QUERY.ALL_CONDUTORES], queryFn: getAxiosData(getAllCondutores) });
  const { 
    data: clientes = [],
    refetch: refetchClientes,
  } = useQuery({ queryKey: [QUERY.ALL_CLIENTES], queryFn: getAxiosData(getAllClientes) });
  const { 
    data: veiculos = [],
    refetch: refetchVeiculos,
  } = useQuery({ queryKey: [QUERY.ALL_VEICULOS], queryFn: getAxiosData(getAllVeiculos) });
  const queryClient = useQueryClient();
  const { 
    register: createRegister, 
    handleSubmit: createHandleSubmit, 
    formState: { errors: createErrors },
    reset: createReset,
    setValue: createSetValue
  } = useForm<z.infer<typeof createDeslocamentoSchema>>({ resolver: zodResolver(createDeslocamentoSchema) });
  const { 
    register: updateRegister, 
    handleSubmit: updateHandleSubmit, 
    formState: { errors: updateErrors },
    reset: updateReset,
    setValue: updateSetValue
  } = useForm<z.infer<typeof updateDeslocamentoSchema>>({ resolver: zodResolver(updateDeslocamentoSchema) });

  async function handleSync() {
    const toastRef = toast('Sincronizando deslocamentos...', { isLoading: true, autoClose: false });
    const refetchs = await Promise.all([
      refetchDeslocamentos(), 
      refetchCondutores(), 
      refetchClientes(), 
      refetchVeiculos(),
    ]);
    const isSuccess = refetchs.every(refetch => refetch.status === 'success');
    if (isSuccess) {
      toast.update(toastRef, { 
        type: toast.TYPE.INFO, 
        render: 'Deslocamentos sincronizados.', 
        isLoading: false, 
        autoClose: 2000 
      });
    } else {
      toast.update(toastRef, { 
        type: toast.TYPE.ERROR, 
        render: 'Erro ao sincronizar deslocamentos.', 
        isLoading: false, 
        autoClose: 2000 
      });
    }
  }

  const handleSubmitCreate = createHandleSubmit(async (data) => {
    const toastRef = toast('Cadastrando deslocamento...', { autoClose: false, isLoading: true }); 
    const { status } = await createDeslocamento({
      ...data,
      idCliente: +data.idCliente.split('-')[0].trim(),
      idCondutor: +data.idCondutor.split('-')[0].trim(),
      idVeiculo: +data.idVeiculo.split('-')[0].trim(),
    });
    if (status === 200) {
      toast.update(toastRef, { 
        type: toast.TYPE.SUCCESS, 
        render: 'Deslocamento cadastrado com sucesso.', 
        isLoading: false, 
        autoClose: 2000 
      });
      queryClient.invalidateQueries([QUERY.ALL_DESLOCAMENTOS]);
      handleCloseCreateModal();
    } else {
      toast.update(toastRef, { 
        type: toast.TYPE.ERROR, 
        render: 'Erro ao cadastrar deslocamento.', 
        isLoading: false, 
        autoClose: 2000 
      });
    }
  })

  function handleChangeDateCreateModal(date: Dayjs | null) {
    if (date) {
      setInicioDeslocamento(date);
      createSetValue('inicioDeslocamento', date.toISOString());
    }
  }
  
  function handleOpenCreateModal() {
    setInicioDeslocamento(dayjs());
    createSetValue('inicioDeslocamento', dayjs().toISOString());
    setIsModalCreateOpen(true);
  }

  function handleCloseCreateModal() {
    setIsModalCreateOpen(false);
    createReset();
  }

  const handleSubmitUpdate = updateHandleSubmit(async (data) => {
    const toastRef = toast('Finalizando deslocamento...', { isLoading: true, autoClose: false });
    const { status } = await encerrarDeslocamento(data);
    if (status === 200) {
      toast.update(toastRef, { 
        type: toast.TYPE.INFO, 
        render: 'Deslocamento Finalizado.', 
        isLoading: false, 
        autoClose: 2000  
      });
      queryClient.invalidateQueries([QUERY.ALL_DESLOCAMENTOS]);
      handleCloseEditModal();
    } else {
      toast.update(toastRef, { 
        type: toast.TYPE.ERROR, 
        render: 'Erro ao finalizar deslocamento!', 
        isLoading: false, 
        autoClose: 2000 
      });
    }
  })

  function handleChangeDateUpdateModal(date: Dayjs | null) {
    if (date) {
      setFimDeslocamento(date);
      updateSetValue('fimDeslocamento', date.toISOString());
    }
  }

  function handleOpenEditModal(deslocamento: Deslocamento) {
    return () => {
      for (const [key, value] of Object.entries(deslocamento)) {
        updateSetValue(key as keyof z.infer<typeof updateDeslocamentoSchema>, value);
        if (key === 'fimDeslocamento') {
          const fim = dayjs(value ?? new Date());
          setFimDeslocamento(fim);
          updateSetValue('fimDeslocamento', dayjs(fim).toISOString());
        }
      }
      setIsModalEditOpen(true);
    }
  }

  function handleCloseEditModal() {
    setIsModalEditOpen(false);
    updateReset();
  }

  function handleOpenDeleteDialog(deslocamento: Deslocamento) {
    return () => {
      setSelectedDeslocamento(deslocamento);
      setIsDialogDeleteOpen(true);
    }
  }

  function handleCloseDeleteDialog() {
    setIsDialogDeleteOpen(false);
  }

  async function handleDeleteDeslocamento() {
    if (selectedDeslocamento) {
      const toastRef = toast('Deletando deslocamento...', { isLoading: true, autoClose: false  });
      const { status } = await deleteDeslocamento(selectedDeslocamento);
      if (status === 200) {
        toast.update(toastRef, { 
          type: toast.TYPE.SUCCESS, 
          render: 'Deslocamento deletado com sucesso!', 
          isLoading: false, 
          autoClose: 2000  
        });
        queryClient.invalidateQueries([QUERY.ALL_DESLOCAMENTOS]);
        handleCloseDeleteDialog();
      } else {
        toast.update(toastRef, { 
          type: toast.TYPE.ERROR, 
          render: 'Erro ao deletar deslocamento!', 
          isLoading: false, 
          autoClose: 2000  
        });
      }
    }
  }

  return {
    deslocamentos,
    clientes,
    condutores,
    veiculos,
    handleSync,
    isLoadingDeslocamentos,
    selectedDeslocamento,
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
    handleDeleteDeslocamento,
    handleChangeDateCreateModal,
    handleChangeDateUpdateModal,
    inicioDeslocamento,
    fimDeslocamento,
  };
}