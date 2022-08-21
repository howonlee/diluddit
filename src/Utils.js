import React from "react";
import { Outlet, useHref, useLinkClickHandler } from "react-router-dom";

export const NilOutlet = function () {
  return <Outlet />;
};

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
