import {
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import NavigationDrawer from './NavigationDrawer';
import { DashboardLocation } from '../../routes';

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  hidden: {
    visibility: 'hidden'
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  clubMark: {
    marginRight: theme.spacing(2)
  }
}));

type DashboardToolbarProps = {
  location: DashboardLocation;
  hideMenu?: boolean;
};

const DashboardAppBar = ({
  location,
  hideMenu
}: DashboardToolbarProps): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [navigationDrawerOpen, setNavigationDrawerOpen] = useState(false);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={clsx(classes.menuButton, {
            [classes.hidden]: hideMenu
          })}
          onClick={() => setNavigationDrawerOpen(true)}
          disabled={hideMenu}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title}>
          {t(location.description)}
        </Typography>
      </Toolbar>
      <NavigationDrawer
        open={navigationDrawerOpen}
        onClose={() => setNavigationDrawerOpen(false)}
      />
    </AppBar>
  );
};

DashboardAppBar.defaultProps = {
  hideMenu: false
};

export default DashboardAppBar;
