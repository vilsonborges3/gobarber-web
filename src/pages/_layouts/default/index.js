import React from 'react';
import PropTypes from 'prop-types';

import { Wrepper } from './styles';

export default function DefaultLayout({ children }) {
  return <Wrepper>{children}</Wrepper>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
