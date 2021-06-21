import React from "react";
import { string, node, func, arrayOf, oneOf, bool } from "prop-types";
import cn from "clsx";

import "./Button.scss";

function Button({
  type,
  variant,
  handleClick,
  roundedBorders,
  classes,
  children,
  ...props
}) {
  const classNames = cn(
    {
      [`border-radius`]: roundedBorders,
      [`btn`]: true,
      [`btn-${variant}`]: true,
    },
    ...classes,
  );

  return (
    <button
      className={classNames}
      /** @see https://github.com/yannickcr/eslint-plugin-react/issues/1846#issuecomment-614921516 */
      /* eslint-disable-next-line react/button-has-type */
      type={type}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  handleClick: func,
  roundedBorders: bool,
  children: node.isRequired,
  classes: arrayOf(string),
  type: oneOf(["button", "submit"]),
  variant: oneOf(["primary", "secondary"]),
};

Button.defaultProps = {
  roundedBorders: false,
  handleClick: null,
  classes: [],
  type: "submit",
  variant: "primary",
};

export default Button;