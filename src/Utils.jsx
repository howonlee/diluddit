import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Outlet, useHref, useLinkClickHandler } from 'react-router-dom';

function schedule(cardinality, base = 2, power = 1.2, scaling = 0.1) {
  const exponent = cardinality ** power;
  return base + (exponent * scaling);
}

// This is mostly a copy-paste from the React Router impl, futzed with.
// React Router is MIT license, this repo is MIT.
// Their license goes like this:
// https://github.com/remix-run/react-router/blob/main/LICENSE.md
// Bam, copyright notice reproduced.
/* eslint-disable react/require-default-props */
export const DelayedLink = React.forwardRef(
  (
    {
      onClick, state, target, to, ...rest
    },
    ref,
  ) => {
    const href = useHref(to);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal(time, event) {
      setIsOpen(true);
      setTimeout((ev) => {
        setIsOpen(false);
        window.location = ev.target.href;
      }, time * 1000, event);
    }

    function handleClick(event) {
      event.preventDefault();
      const date = new Date();
      const dateKey = date.toDateString();
      const numVisited = parseInt(window.localStorage.getItem(dateKey), 10) || 0;
      const pauseLength = schedule(numVisited);
      window.localStorage.setItem(dateKey, numVisited + 1);
      openModal(pauseLength, event);
    }

    return (
      /* eslint-disable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading */
      <span>
        <a
          {...rest}
          href={href}
          onClick={handleClick}
          ref={ref}
          target={target}
        />
        <Modal
          isOpen={modalIsOpen}
          style={{
            overlay: {
              background: '#333',
              color: 'white',
              height: '100vh',
              width: '100vw',
            },
            content: {
              background: '#333',
              color: 'white',
              fontSize: '8vh',
              height: '80vh',
              width: '60vw',
            },
          }}
          ariaHideApp={false}
        >
          <p>Diluting...</p>
        </Modal>
      </span>
      /* eslint-enable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading */
    );
  },
);

DelayedLink.propTypes = {
  onClick: PropTypes.func,
  replace: PropTypes.bool,
  state: PropTypes.any,
  target: PropTypes.any,
  to: PropTypes.string.isRequired,
};
/* eslint-enable react/require-default-props */

export function NilOutlet() {
  return <Outlet />;
}

export const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/.test(url);
