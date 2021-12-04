import React from 'react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps): JSX.Element => (
  <header>
    <p>{title}</p>
  </header>
);

export default Header;
