import { FC, PropsWithChildren } from "react";
import s from "../Button/button.module.scss";
import cn from "classnames";
import { Link, LinkProps, To } from "react-router-dom";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

type LinkButtonProps = PropsWithChildren<{
  variant: "orange" | "dark" | "transparent" | "black" | "glass";
  href: To;
  disabled?: boolean;
  className?: string;
}> &
  Partial<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  variant,
  disabled,
  href,
  className,
  ...buttonProps
}) => {
  const { ref, focused } = useFocusable();

  const variants: Record<LinkButtonProps["variant"], string> = {
    orange: s.orange,
    black: s.black,
    dark: s.dark,
    transparent: s.transparent,
    glass: s.glass,
  };

  return (
    <Link
      ref={ref}
      to={href}
      className={cn(
        s.button,
        variants[variant],
        disabled ? s.disabled : null,
        focused ? s.focused : null,
        className
      )}
      {...buttonProps}
    >
      {children}
    </Link>
  );
};
