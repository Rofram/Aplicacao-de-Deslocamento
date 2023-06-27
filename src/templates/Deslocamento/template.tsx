import { SlideTransition } from '@/components/transitions/SlideTransition';
import ErrorBoundary from '@/components/utils/ErrorBoundary';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FlagIcon from '@mui/icons-material/Flag';
import SyncIcon from '@mui/icons-material/Sync';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Fragment } from 'react';
import { useDeslocamentoHook } from "./hook";

export function DeslocamentoPageTemplate() {
  const { 
    deslocamentos,
    clientes,
    condutores,
    veiculos,
    handleSync,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleOpenDeleteDialog,
    isModalCreateOpen,
    handleSubmitCreate,
    createErrors,
    createRegister,
    handleSubmitUpdate,
    handleCloseEditModal,
    isModalEditOpen,
    updateErrors,
    updateRegister,
    isDialogDeleteOpen,
    handleCloseDeleteDialog,
    handleChangeDateCreateModal,
    fimDeslocamento,
    isLoadingDeslocamentos,
    handleChangeDateUpdateModal,
    handleDeleteDeslocamento,
    inicioDeslocamento,
    selectedDeslocamento,
  } = useDeslocamentoHook();
  const deslocamentosGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'idCliente',
      headerName: "Cliente",
      width: 160,
      renderCell(params) {
        return clientes.find(cliente => cliente.id === params.value)?.nome;
      }
    },
    {
      field: "idCondutor",
      headerName: "Condutor",
      width: 160,
      renderCell(params) {
        return condutores.find(condutor => condutor.id === params.value)?.nome;
      }
    },
    {
      field: "idVeiculo",
      headerName: "Veiculo",
      width: 160,
      renderCell(params) {
        return veiculos.find(veiculo => veiculo.id === params.value)?.marcaModelo;
      }
    },
    {
      field: "inicioDeslocamento",
      headerName: "Inicio do Deslocamento",
      width: 180,
      renderCell(params) {
          return new Intl.DateTimeFormat('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' ,
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
          }).format(new Date(params.value));
      },
    },
    {
      field: "fimDeslocamento",
      headerName: "Fim do Deslocamento",
      width: 180,
      renderCell(params) {
        const formatter = new Intl.DateTimeFormat('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' ,
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric',
        })
        return params.value ? formatter.format(new Date(params.value)) : 'Ainda não finalizado';
      },
    },
    {
      field: "",
      headerName: "Ações",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          {!params.row.fimDeslocamento && (
            <Tooltip title="Finalizar Deslocamento">
              <IconButton onClick={handleOpenEditModal(params.row)}>
                <FlagIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Excluir">
            <IconButton onClick={handleOpenDeleteDialog(params.row)}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Fragment>
      <Paper sx={{ alignSelf: "center", justifySelf: "center", width: "100%", height: "90%", padding: "20px", display: "flex", flexDirection: "column" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Deslocamento</Typography>
          <Box display='flex' gap={2} alignItems='center'>
            <Tooltip title="Sincronizar Deslocamento">
              <Button 
                variant="contained"
                color="primary"
                onClick={handleSync}
              >
                <SyncIcon />
              </Button>
            </Tooltip>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>Cadastrar Deslocamento</Button>
          </Box>
        </Box>
        <Box mt={2} height="93%" width="100%">
          <ErrorBoundary>
            <DataGrid columns={deslocamentosGridColumns} loading={isLoadingDeslocamentos} rows={deslocamentos} />
          </ErrorBoundary>
        </Box>
      </Paper>
      <Modal 
        open={isModalCreateOpen}
        onClose={handleCloseCreateModal}
        aria-labelledby="Modal Cadastro de Deslocamento"
        aria-describedby="Modal para Cadastro de Deslocamento"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Paper sx={{  display: 'flex', flexDirection: 'column', p: 2, gap: 2, width: '100%', maxWidth: '800px' }}>
          <Typography variant='h4'>Cadastrar Deslocamento</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para cadastrar um novo deslocamento.
          </Typography>
          <form onSubmit={handleSubmitCreate}>
            <Box display='flex' gap={1} alignItems="center">
              <TextField
                autoFocus
                margin="dense"
                type="number"
                label="Quilometragem Inicial"
                variant="outlined"
                error={!!createErrors.kmInicial}
                helperText={createErrors.kmInicial?.message}
                {...createRegister('kmInicial')}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Vencimento da Habilitação"
                  defaultValue={inicioDeslocamento}
                  onChange={handleChangeDateCreateModal}
                />
              </LocalizationProvider>
            </Box>
            <Box display="flex" my={1} gap={1}>
              <Autocomplete 
                options={condutores.map(condutor => `${condutor.id} - ${condutor.nome}`)}
                fullWidth
                disablePortal
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Condutor"
                    variant="outlined"
                    error={!!createErrors.idCondutor}
                    helperText={createErrors.idCondutor?.message}
                    {...createRegister('idCondutor')}
                  />
                )}
              />
              <Autocomplete 
                options={clientes.map(cliente => `${cliente.id} - ${cliente.nome}`)}
                fullWidth
                disablePortal
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Cliente"
                    variant="outlined"
                    error={!!createErrors.idCondutor}
                    helperText={createErrors.idCondutor?.message}
                    {...createRegister('idCliente')}
                  />
                )}
              />
              <Autocomplete 
                options={veiculos.map(veiculo => `${veiculo.id} - ${veiculo.marcaModelo}`)}
                fullWidth
                disablePortal
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    label="Veiculo"
                    variant="outlined"
                    error={!!createErrors.idCondutor}
                    helperText={createErrors.idCondutor?.message}
                    {...createRegister('idVeiculo')}
                  />
                )}
              />
            </Box>
            <Box display='flex' gap={1}>
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                label="Motivo"
                variant="outlined"
                error={!!createErrors.motivo}
                helperText={createErrors.motivo?.message}
                {...createRegister('motivo')}
              />
              <TextField
                margin="dense"
                fullWidth
                label="Checklist"
                variant="outlined"
                error={!!createErrors.checkList}
                helperText={createErrors.checkList?.message}
                {...createRegister('checkList')}
              />
            </Box>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              label="Observação"
              variant="outlined"
              error={!!createErrors.observacao}
              helperText={createErrors.observacao?.message}
              {...createRegister('observacao')}
            />
            <Box display="flex" justifyContent="flex-end" gap={1} mt={4}>
              <Button type='button' variant='outlined' onClick={handleCloseCreateModal}>Cancelar</Button>
              <Button type='submit' variant='contained'>Cadastrar</Button>
            </Box>
          </form>
        </Paper>
      </Modal>
      <Modal 
        open={isModalEditOpen}
        onClose={handleCloseEditModal}
        aria-labelledby="Modal Cadastro de Cliente"
        aria-describedby="Modal para Cadastro de Cliente"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Paper sx={{  display: 'flex', flexDirection: 'column', p: 2, gap: 2, width: '100%', maxWidth: '800px' }}>
          <Typography variant='h4'>Finalizar Deslocamento</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para finalizar o deslocamento.
          </Typography>
          <form onSubmit={handleSubmitUpdate}>
            <input type="text" style={{ display: 'none' }} {...updateRegister('id')} />
            <TextField
              autoFocus
              margin="dense"
              label="Quilometragem Final"
              type="number"
              fullWidth
              variant="outlined"
              error={!!updateErrors.kmFinal}
              helperText={updateErrors.kmFinal?.message}
              {...updateRegister('kmFinal')}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Observação"
              fullWidth
              variant="outlined"
              error={!!updateErrors.observacao}
              helperText={updateErrors.observacao?.message}
              {...updateRegister('observacao')}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Vencimento da Habilitação"
                value={fimDeslocamento}
                onChange={handleChangeDateUpdateModal}
              />
            </LocalizationProvider>
            <Box display="flex" justifyContent="flex-end" gap={1} mt={4}>
              <Button type='button' variant='outlined' onClick={handleCloseEditModal}>Cancelar</Button>
              <Button type='submit' variant='contained'>Atualizar</Button>
            </Box>
          </form>
        </Paper>
      </Modal>
      <Dialog
        open={isDialogDeleteOpen}
        onClose={handleCloseDeleteDialog}
        keepMounted
        TransitionComponent={SlideTransition}
        aria-describedby="deletar cliente dialog"
      >
        <DialogTitle>Deletar Deslocamento: {selectedDeslocamento?.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja deletar este deslocamento?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteDeslocamento}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}