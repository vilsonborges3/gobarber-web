import React from 'react';
import PropTypes from 'prop-types';

import { Wrepper } from './styles';

export default function AuthLayout({ children }) {
  return <Wrepper>{children}</Wrepper>;
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
