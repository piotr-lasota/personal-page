import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '../../../components';

const ContentCardInternals = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <CardHeader
        title={t('justKidding')}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <Typography align="center">{t('nothingHereYet')}</Typography>
      </CardContent>
    </>
  );
};

const LoadingCardInternals = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <CardContent>
        <LoadingSpinner header={t('loading')} text={t('awesomeContentAhead')} />
      </CardContent>
    </>
  );
};

const LandingPage = (): JSX.Element => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    async function displayContentAfterAWhile() {
      await new Promise((res) => setTimeout(res, 3000));
      setShowContent(true);
    }

    displayContentAfterAWhile();
  }, [setShowContent]);

  return (
    <Paper elevation={0}>
      <Card>
        <Box p={2}>
          {showContent ? <ContentCardInternals /> : <LoadingCardInternals />}
        </Box>
      </Card>
    </Paper>
  );
};

export default LandingPage;
