import React from 'react';
import PropTypes from 'prop-types';

export default function MyButton({ count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      {`Clicked ${count} times`}
    </button>
  );
}

MyButton.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
