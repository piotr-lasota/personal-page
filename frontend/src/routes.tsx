import HomeIcon from '@material-ui/icons/Home';
import React, { ReactNode } from 'react';

export type DashboardLocation = {
  path: string;
  description: string;
  icon: ReactNode;
};

export const HOME: DashboardLocation = {
  path: '/',
  description: 'home.route',
  icon: <HomeIcon />
};

export const toMatchingDashboardLocation = (
  locationPathName: string
): DashboardLocation => {
  const match = [HOME].find((route) => route.path === locationPathName);

  if (!match) {
    throw new Error('location not found');
  }

  return match;
};
