import React, { useCallback, useState } from 'react';
import { Button } from 'gatsby-theme-material-ui';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps): JSX.Element => {
  const [showSubtext, setShowSubtext] = useState(false);

  const handleShowSubtextClicked = useCallback(
    () => setShowSubtext(true),
    [setShowSubtext]
  );

  return (
    <header>
      <p>{title}</p>
      <Button onClick={handleShowSubtextClicked}>Show subtext</Button>
      {showSubtext && <p>This is a subtext</p>}
    </header>
  );
};

export default Header;
