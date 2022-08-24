import React from "react";
import { Outlet, useHref, useLinkClickHandler } from "react-router-dom";

// This is mostly a copy-paste from the React Router impl.
// React Router is MIT license, this repo is MIT.
// Their license goes like this:
// https://github.com/remix-run/react-router/blob/main/LICENSE.md
// Bam, copyright notice reproduced.
export const DelayedLink = React.forwardRef(
  function DelayedLinkWithRef(
    { onClick, replace = false, state, target, to, ...rest },
    ref
  ) {
    let href = useHref(to);
    let internalOnClick = useLinkClickHandler(to, { replace, state, target });
    function handleClick(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        console.log("delay here....");
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
  }
);

export const NilOutlet = function () {
  return <Outlet />;
};

export const isImage = function(url) {
  return /\.(jpg|jpeg|png|webp|gif|svg)$/.test(url);
};
