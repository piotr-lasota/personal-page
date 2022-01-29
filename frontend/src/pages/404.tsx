// noinspection JSUnusedGlobalSymbols
import React from 'react';
import ErrorPage from '../components/ErrorPage';

const NotFoundPage = (): JSX.Element => (
  <ErrorPage code={404} title="Not found" text="This page does not exist" />
);

export default NotFoundPage;
