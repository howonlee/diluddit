import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useHref, useLinkClickHandler } from 'react-router-dom';

function schedule(cardinality, base = 2, power = 1.5, scaling = 0.1) {
  const exponent = cardinality ** power;
  return base + (exponent * scaling);
}

function DelayModal() {
  ///
  ///
  ///
  ///
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
      onClick, replace = false, state, target, to, ...rest
    },
    ref,
  ) => {
    const href = useHref(to);
    const internalOnClick = useLinkClickHandler(to, { replace, state, target });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        const date = new Date();
        const dateKey = date.toDateString();
        const numVisited = parseInt(window.localStorage.getItem(dateKey), 10) || 0;
        const pauseLength = schedule(numVisited);
        console.log('wait here...');
        console.log(pauseLength);
        window.localStorage.setItem(dateKey, numVisited + 1);
        internalOnClick(event);
      }
    }

    // whole damn modal here...
    return (
      /* eslint-disable jsx-a11y/anchor-has-content, react/jsx-props-no-spreading */
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
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
