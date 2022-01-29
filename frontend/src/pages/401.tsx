// noinspection JSUnusedGlobalSymbols
import React from 'react';
import ErrorPage from '../components/ErrorPage';

const UnauthorizedPage = (): JSX.Element => (
  <ErrorPage code={401} title="Unauthorized" text="You should not be here!" />
);

export default UnauthorizedPage;
