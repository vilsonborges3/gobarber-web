import React from 'react';
import PropTypes from 'prop-types';

import { Wrepper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrepper>
      <Content>{children}</Content>
    </Wrepper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
