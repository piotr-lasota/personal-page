import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { navigate } from 'gatsby';

type BlogPostActionsSpeedDialProps = {
  postLocation: string;
};
const BlogPostActionsSpeedDial = ({
  postLocation
}: BlogPostActionsSpeedDialProps): JSX.Element => {
  const actions = useMemo(() => {
    return [
      {
        icon: <CommentsDisabledIcon />,
        name: 'Manage comments',
        onClick: () => navigate(postLocation)
      }
    ];
  }, [postLocation]);

  return (
    <Box
      sx={{
        position: 'sticky',
        right: 0,
        bottom: 0
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: 'absolute',
          bottom: (theme) => theme.spacing(3),
          right: (theme) => theme.spacing(3)
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default BlogPostActionsSpeedDial;
