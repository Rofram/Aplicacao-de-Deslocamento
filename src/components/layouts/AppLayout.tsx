import { useSidebarStore } from "@/stores/sidebar.store";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Container, Divider, IconButton, List, Toolbar, Typography } from "@mui/material";
import { AppBar } from "../ui/AppBar";
import { Drawer } from "../ui/Drawer";
import { navItems } from "./navItems";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isOpen = useSidebarStore(selector => selector.isOpen);
  const toggleDrawer = useSidebarStore(selector => selector.toggle);

  return (
    <Box display='flex'>
      <AppBar position="absolute" open={isOpen}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(isOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Aplicação de Deslocamento
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {navItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4, height: '100%', display: "flex" }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
