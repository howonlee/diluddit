import React from 'react';
import { Outlet, useHref, useLinkClickHandler } from 'react-router-dom';

// This is mostly a copy-paste from the React Router impl.
// React Router is MIT license, this repo is MIT.
// Their license goes like this:
// https://github.com/remix-run/react-router/blob/main/LICENSE.md
// Bam, copyright notice reproduced.
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
        console.log('delay here....');
        internalOnClick(event);
      }
    }

    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
    );
  },
);

export function NilOutlet() {
  return <Outlet />;
}

export const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|svg)$/.test(url);
