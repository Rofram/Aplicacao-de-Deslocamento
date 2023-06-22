import ErrorBoundary from '@/components/ErrorBoundary';
import { SlideTransition } from '@/components/ui/SlideTransition';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Fragment } from 'react';
import { useCondutorHook } from "./hook";

export function CondutorPageTemplate() {
  const { 
    condutores,
    refetch,
    isCondutoresLoading,
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
    selectedCondutor,
    handleDeleteCondutor,
    handleChangeDateCreateModal,
    vencimentoHabilitacao
  } = useCondutorHook();
  const condutoresGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'nome',
      headerName: "Nome",
      width: 200
    },
    {
      field: "catergoriaHabilitacao",
      headerName: "Categoria da Habilitação",
      width: 200
    },
    {
      field: "numeroHabilitacao",
      headerName: "Numero da Habilitação",
      width: 250
    },
    {
      field: "vencimentoHabilitacao",
      headerName: "Vencimento da Habilitação",
      width: 200,
      renderCell(params) {
          return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(params.value));
      },
    },
    {
      field: "",
      headerName: "Ações",
      width: 200,
      renderCell: (cell) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Editar">
            <IconButton onClick={handleOpenEditModal(cell.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton onClick={handleOpenDeleteDialog(cell.row)}>
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
          <Typography variant="h4">Condutores</Typography>
          <Box display='flex' gap={2} alignItems='center'>
            <Tooltip title="Sincronizar Condutores">
              <Button 
                variant="contained"
                color="primary"
                onClick={() => refetch()}
              >
                <SyncIcon />
              </Button>
            </Tooltip>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>Cadastrar Condutor</Button>
          </Box>
        </Box>
        <Box mt={2} height="93%" width="100%">
          <ErrorBoundary>
            <DataGrid columns={condutoresGridColumns} loading={isCondutoresLoading} rows={condutores} />
          </ErrorBoundary>
        </Box>
      </Paper>
      <Modal 
        open={isModalCreateOpen}
        onClose={handleCloseCreateModal}
        aria-labelledby="Modal Cadastro de Cliente"
        aria-describedby="Modal para Cadastro de Cliente"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Paper sx={{  display: 'flex', flexDirection: 'column', p: 2, gap: 2, width: '100%', maxWidth: '800px' }}>
          <Typography variant='h4'>Cadastrar Condutor</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para cadastrar um novo condutor.
          </Typography>
          <form onSubmit={handleSubmitCreate}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              variant="outlined"
              error={!!createErrors.nome}
              helperText={createErrors.nome?.message}
              {...createRegister('nome')}
            />
            <Box display="flex" my={1} gap={1}>
              <TextField
                margin="dense"
                label="Categoria da Habilitação"
                fullWidth
                variant="outlined"
                error={!!createErrors.catergoriaHabilitacao}
                helperText={createErrors.catergoriaHabilitacao?.message}
                {...createRegister('catergoriaHabilitacao')}
              />
              <TextField
                margin="dense"
                label="Numero da Habilitação"
                type='number'
                fullWidth
                variant="outlined"
                error={!!createErrors.numeroHabilitacao}
                helperText={createErrors.numeroHabilitacao?.message}
                {...createRegister('numeroHabilitacao')}
              />
            </Box>
            <LocalizationProvider adapterLocale='' dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Vencimento da Habilitação"
                defaultValue={vencimentoHabilitacao}
                onChange={handleChangeDateCreateModal}
              />
            </LocalizationProvider>
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
          <Typography variant='h4'>Editar Condutor</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para atualizar o condutor.
          </Typography>
          <form onSubmit={handleSubmitUpdate}>
            <input type="text" style={{ display: 'none' }} {...updateRegister('id')} />
            <TextField
              autoFocus
              margin="dense"
              label="Categoria da Habilitação"
              fullWidth
              variant="outlined"
              error={!!updateErrors.catergoriaHabilitacao}
              helperText={updateErrors.catergoriaHabilitacao?.message}
              {...updateRegister('catergoriaHabilitacao')}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Vencimento da Habilitação"
                value={vencimentoHabilitacao}
                onChange={handleChangeDateCreateModal}
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
        <DialogTitle>Deletar Condutor: {selectedCondutor?.nome}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja deletar este condutor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteCondutor}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}