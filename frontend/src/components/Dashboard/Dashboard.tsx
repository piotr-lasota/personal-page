import React, { ReactNode } from 'react';
import { Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DashboardAppBar from './DashboardAppBar';
import { DashboardLocation } from '../../routes';

const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar
}));

type DashboardProps = {
  location: DashboardLocation;
  children?: ReactNode;
  hideMenu?: boolean;
};

const Dashboard = ({
  children,
  location,
  hideMenu
}: DashboardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <DashboardAppBar hideMenu={hideMenu} location={location} />
      <div className={classes.offset} />
      {children}
    </Container>
  );
};

Dashboard.defaultProps = {
  children: null,
  hideMenu: false
};

export default Dashboard;
