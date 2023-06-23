import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HailIcon from '@mui/icons-material/Hail';
import PersonIcon from '@mui/icons-material/Person';
import RouteIcon from '@mui/icons-material/Route';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { Fragment } from 'react';

export const navItems = (
  <Fragment>
    <ListItemButton LinkComponent={Link} href="/clientes">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Clientes" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} href="/condutores">
      <ListItemIcon>
        <HailIcon />
      </ListItemIcon>
      <ListItemText primary="Condutores" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} href="/deslocamentos">
      <ListItemIcon>
        <RouteIcon />
      </ListItemIcon>
      <ListItemText primary="Deslocamentos" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} href="/veiculos">
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText primary="Veiculos" />
    </ListItemButton>
  </Fragment>
);