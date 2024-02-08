import { FC } from "react";

import s from "../button.module.scss";
import cn from "classnames";

import { ButtonProps, variants } from "../Button";

const ButtonWithoutFocus: FC<ButtonProps> = (props) => {
  const {
    children,
    variant,
    disabled = false,
    className,
    ...buttonProps
  } = props;

  return (
    <button
      className={cn(
        s.button,
        variants[variant],
        disabled ? s.disabled : null,
        className
      )}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default ButtonWithoutFocus