import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import s from "./button.module.scss";
import cn from "classnames";

type ButtonProps = {
  variant: "orange" | "dark" | "transparent" | "black" | "glass";
  href?: string;
} & Partial<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  disabled,
  ...buttonProps
}) => {
  const variants: Record<ButtonProps["variant"], string> = {
    orange: s.orange,
    black: s.black,
    dark: s.dark,
    transparent: s.transparent,
    glass: s.glass,
  };

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
