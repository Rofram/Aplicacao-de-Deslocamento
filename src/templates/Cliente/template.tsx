import ErrorBoundary from '@/components/ErrorBoundary';
import { SlideTransition } from '@/components/ui/SlideTransition';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { useClienteHook } from "./hook";

export function ClientePageTemplate() {
  const { 
    clientes,
    isClientesLoading,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleEditClient,
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
    selectedCliente,
    handleDeleteCliente,
  } = useClienteHook();
  const clientesGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
    },
    {
      field: 'nome',
      headerName: "Nome",
      width: 130,
    },
    {
      field: "tipoDocumento",
      headerName: "Tipo de Documento",
      width: 150,
    },
    {
      field: "numeroDocumento",
      headerName: "Numero do Documento",
      width: 180,
    },
    {
      field: "logradouro",
      headerName: "Logradouro",
    },
    {
      field: "numero",
      headerName: "Numero",
    },
    {
      field: "bairro",
      headerName: "Bairro",
    },
    {
      field: "cidade",
      headerName: "Cidade",
    },
    {
      field: "uf",
      headerName: "UF",
      width: 60,
    },
    {
      field: "",
      headerName: "Ações",
      width: 130,
      renderCell: (cell) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Editar">
            <IconButton onClick={handleEditClient(cell.row)}>
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
      <Paper sx={{ mt: 2, alignSelf: "center", justifySelf: "center", width: "100%", height: "90%", padding: "20px", display: "flex", flexDirection: "column" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Clientes</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>Cadastrar Cliente</Button>
        </Box>
        <Box mt={2} height="93%" width="100%">
          <ErrorBoundary>
            <DataGrid columns={clientesGridColumns} loading={isClientesLoading} rows={clientes} />
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
          <Typography variant='h4'>Cadastrar Cliente</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para cadastrar um novo cliente.
          </Typography>
          <form onSubmit={handleSubmitCreate}>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              variant="standard"
              error={!!createErrors.nome}
              helperText={createErrors.nome?.message}
              {...createRegister('nome')}
            />
            <Box display="flex" gap={1}>
              <TextField
                margin="dense"
                label="Tipo do Documento"
                fullWidth
                variant="standard"
                error={!!createErrors.tipoDocumento}
                helperText={createErrors.tipoDocumento?.message}
                {...createRegister('tipoDocumento')}
              />
              <TextField
                margin="dense"
                label="Numero do Documento"
                fullWidth
                variant="standard"
                error={!!createErrors.numeroDocumento}
                helperText={createErrors.numeroDocumento?.message}
                {...createRegister('numeroDocumento')}
              />
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                margin="dense"
                label="Logradouro"
                fullWidth
                variant="standard"
                error={!!createErrors.logradouro}
                helperText={createErrors.logradouro?.message}
                {...createRegister('logradouro')}
              />
              <TextField
                margin="dense"
                label="N°"
                variant="standard"
                error={!!createErrors.numero}
                helperText={createErrors.numero?.message}
                {...createRegister('numero')}
              />
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                margin="dense"
                label="Bairro"
                fullWidth
                variant="standard"
                error={!!createErrors.bairro}
                helperText={createErrors.bairro?.message}
                {...createRegister('bairro')}
              />
              <TextField
                margin="dense"
                label="Cidade"
                fullWidth
                variant="standard"
                error={!!createErrors.cidade}
                helperText={createErrors.cidade?.message}
                {...createRegister('cidade')}
              />
            </Box>
            <TextField
              margin="dense"
              label="UF"
              variant="standard"
              error={!!createErrors.uf}
              helperText={createErrors.uf?.message}
              {...createRegister('uf')}
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
          <Typography variant='h4'>Editar Cliente</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para atualizar o cliente.
          </Typography>
          <form onSubmit={handleSubmitUpdate}>
            <input type="text" style={{ display: 'none' }} {...updateRegister('id')} />
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              variant="standard"
              error={!!updateErrors.nome}
              helperText={updateErrors.nome?.message}
              {...updateRegister('nome')}
            />
            <Box display="flex" gap={1}>
              <TextField
                margin="dense"
                label="Logradouro"
                fullWidth
                variant="standard"
                error={!!updateErrors.logradouro}
                helperText={updateErrors.logradouro?.message}
                {...updateRegister('logradouro')}
              />
              <TextField
                margin="dense"
                label="N°"
                variant="standard"
                error={!!updateErrors.numero}
                helperText={updateErrors.numero?.message}
                {...updateRegister('numero')}
              />
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                margin="dense"
                label="Bairro"
                fullWidth
                variant="standard"
                error={!!updateErrors.bairro}
                helperText={updateErrors.bairro?.message}
                {...updateRegister('bairro')}
              />
              <TextField
                margin="dense"
                label="Cidade"
                fullWidth
                variant="standard"
                error={!!updateErrors.cidade}
                helperText={updateErrors.cidade?.message}
                {...updateRegister('cidade')}
              />
            </Box>
            <TextField
              margin="dense"
              label="UF"
              variant="standard"
              error={!!updateErrors.uf}
              helperText={updateErrors.uf?.message}
              {...updateRegister('uf')}
            />
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
        <DialogTitle>Deletar Cliente: {selectedCliente?.nome}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja deletar este cliente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteCliente}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}