import { FC, HTMLProps, PropsWithChildren } from "react";
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

type Variants = "orange" | "dark" | "transparent" | "black" | "glass";

type FocusedVariants = Variants | "white";

type LinkButtonProps = PropsWithChildren<{
  variant: Variants;
  focusedClassName?: FocusedVariants;
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
  Partial<LinkProps & HTMLProps<HTMLAnchorElement>>;

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  variant,
  disabled,
  href,
  className,
  focusedClassName,
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
  const focusedVariants: Record<FocusedVariants, string> = {
    orange: s.focusOrange,
    black: s.focusBlack,
    dark: s.focusDark,
    transparent: s.focusTransparent,
    glass: s.focusGlass,
    white: s.focusedWhite,
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
          {
            [focusedVariants[focusedClassName as FocusedVariants]]:
              focusedClassName && focused,
          },
          className
        )}
        {...buttonProps}
      >
        {children}
      </Link>
    </FocusContext.Provider>
  );
};
