import React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { DashboardLocation, HOME } from '../../routes';

const doNothing = () => {};

const routes: DashboardLocation[] = [HOME];

type NavigationDrawerProps = {
  open: boolean;
  onClose?: () => void;
};
const NavigationDrawer = ({
  open,
  onClose
}: NavigationDrawerProps): JSX.Element => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleClose = () => {
    if (!onClose) {
      return;
    }

    onClose();
  };

  const navigateTo = (location: DashboardLocation) => () => {
    handleClose();
    history.push(location.path);
  };

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <List>
        {routes.map((route) => (
          <ListItem button key={route.path} onClick={navigateTo(route)}>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={t(route.description)} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

NavigationDrawer.defaultProps = {
  onClose: doNothing
};

export default NavigationDrawer;
