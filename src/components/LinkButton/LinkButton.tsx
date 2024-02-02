import { FC, PropsWithChildren } from "react";
import s from "../Button/button.module.scss";
import cn from "classnames";
import { Link, LinkProps, To, useLocation } from "react-router-dom";
import {
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { LinkButtonExtraProps } from "@/types/extraProps/LinkButton";

type LinkButtonProps = PropsWithChildren<{
  variant: "orange" | "dark" | "transparent" | "black" | "glass";
  href: To;
  disabled?: boolean;
  className?: string;
  onPress?: (props: LinkButtonExtraProps, details: KeyPressDetails) => void;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}> &
  Partial<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  variant,
  disabled,
  href,
  className,
  onFocus,
  onPress,
  ...buttonProps
}) => {
  const location = useLocation();
  const { ref, focused, focusKey } = useFocusable<LinkButtonExtraProps>({
    onFocus,
    onEnterPress: onPress,
    extraProps: { clicked: true, to: href, current: location },
  });

  const variants: Record<LinkButtonProps["variant"], string> = {
    orange: s.orange,
    black: s.black,
    dark: s.dark,
    transparent: s.transparent,
    glass: s.glass,
  };

  return (
    <FocusContext.Provider value={focusKey}>
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
    </FocusContext.Provider>
  );
};
