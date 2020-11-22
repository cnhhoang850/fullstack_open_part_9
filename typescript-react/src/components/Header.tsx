import React from 'react';

interface HeaderProp {
  name: string
}

const Header: React.FC<HeaderProp> = ({name}: HeaderProp) => {
  return <h1>Hello, {name}</h1>;
};

export default Header;