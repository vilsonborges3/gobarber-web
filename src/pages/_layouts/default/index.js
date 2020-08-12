import React from 'react';
import PropTypes from 'prop-types';

import { Wrepper } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children }) {
  return (
    <Wrepper>
      <Header />
      {children}
    </Wrepper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
