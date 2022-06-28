import React from 'react';
import { Title } from '../components/Title';

const HelloMessage = ({ name = 'World' }) => {
  return <Title>Hello {name} </Title>;
};

export default HelloMessage;
