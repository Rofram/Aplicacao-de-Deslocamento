import ErrorBoundary from '@/components/ErrorBoundary';
import { SlideTransition } from '@/components/ui/SlideTransition';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Modal, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { useVeiculoHook } from "./hook";

export function VeiculoPageTemplate() {
  const { 
    veiculos,
    isVeiculosLoading,
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
    selectedVeiculo,
    handleDeleteVeiculo
  } = useVeiculoHook();
  const veiculosGridColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60
    },
    {
      field: 'marcaModelo',
      headerName: "Marca/Modelo",
      width: 200
    },
    {
      field: "placa",
      headerName: "Placa",
      width: 150
    },
    {
      field: "kmAtual",
      headerName: "Quilometragem Atual",
      width: 200
    },
    {
      field: "anoFabricacao",
      headerName: "Ano de Fabricação",
      width: 200,
    },
    {
      field: "",
      headerName: "Ações",
      width: 250,
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
          <Typography variant="h4">Veiculos</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>Cadastrar Veiculo</Button>
        </Box>
        <Box mt={2} height="93%" width="100%">
          <ErrorBoundary>
            <DataGrid columns={veiculosGridColumns} loading={isVeiculosLoading} rows={veiculos} />
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
          <Typography variant='h4'>Cadastrar Veiculo</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para cadastrar um novo veiculo.
          </Typography>
          <form onSubmit={handleSubmitCreate}>
            <TextField
              autoFocus
              margin="dense"
              label="Marca/Modelo"
              fullWidth
              variant="outlined"
              error={!!createErrors.marcaModelo}
              helperText={createErrors.marcaModelo?.message}
              {...createRegister('marcaModelo')}
            />
            <Box display="flex" my={1} gap={1}>
              <TextField
                margin="dense"
                label="Ano de Fabricação"
                fullWidth
                type='number'
                variant="outlined"
                error={!!createErrors.anoFabricacao}
                helperText={createErrors.anoFabricacao?.message}
                {...createRegister('anoFabricacao')}
              />
              <TextField
                margin="dense"
                label="Quilometragem Atual"
                type='number'
                fullWidth
                variant="outlined"
                error={!!createErrors.kmAtual}
                helperText={createErrors.kmAtual?.message}
                {...createRegister('kmAtual')}
              />
            </Box>
            <TextField
                margin="dense"
                label="Numero da Habilitação"
                variant="outlined"
                error={!!createErrors.placa}
                helperText={createErrors.placa?.message}
                {...createRegister('placa')}
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
          <Typography variant='h4'>Editar Veiculo</Typography>
          <Typography variant='body1' color='text.secondary'>
            Preencha os campos abaixo para atualizar o veiculo.
          </Typography>
          <form onSubmit={handleSubmitUpdate}>
            <input type="text" style={{ display: 'none' }} {...updateRegister('id')} />
            <TextField
              autoFocus
              margin="dense"
              label="Marca/Modelo"
              fullWidth
              variant="outlined"
              error={!!updateErrors.marcaModelo}
              helperText={updateErrors.marcaModelo?.message}
              {...updateRegister('marcaModelo')}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Quilometragem Atual"
              type="number"
              fullWidth
              variant="outlined"
              error={!!updateErrors.kmAtual}
              helperText={updateErrors.kmAtual?.message}
              {...updateRegister('kmAtual')}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Ano de Fabricação"
              type="number"
              fullWidth
              variant="outlined"
              error={!!updateErrors.anoFabricacao}
              helperText={updateErrors.anoFabricacao?.message}
              {...updateRegister('anoFabricacao')}
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
        <DialogTitle>Deletar Veiculo: {selectedVeiculo?.marcaModelo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que deseja deletar este veiculo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button color="error" onClick={handleDeleteVeiculo}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}