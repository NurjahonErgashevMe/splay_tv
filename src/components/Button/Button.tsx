import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import s from "./button.module.scss";
import cn from "classnames";
import {
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

type Variants = "orange" | "dark" | "transparent" | "black" | "glass";

type FocusedVariants = Variants | "white";

export type ButtonProps = {
  variant: Variants;
  href?: string;
  focusedClassName?: FocusedVariants;
  onPress?: (props: object, details: KeyPressDetails) => void;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
} & Partial<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant,
  disabled,
  focusedClassName,
  onPress,
  onFocus,
  ...buttonProps
}) => {
  const { ref, focused, focusKey } = useFocusable({
    onFocus,
    onEnterPress: onPress,
    extraProps: { component: "button" },
  });

  const variants: Record<Variants, string> = {
    orange: s.orange,
    black: s.black,
    dark: s.dark,
    transparent: s.transparent,
    glass: s.glass,
  };
  const focusedVariants: Record<FocusedVariants, string> = {
    orange: s.focusOrange,
    black: s.black,
    dark: s.dark,
    transparent: s.transparent,
    glass: s.glass,
    white: s.focusedWhite,
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <button
        ref={ref}
        className={cn(
          s.button,
          variants[variant],
          disabled ? s.disabled : null,
          {
            [focusedVariants[focusedClassName as FocusedVariants]]:
              focusedClassName && focused,
          },
          className
        )}
        disabled={disabled}
        {...buttonProps}
      >
        {children}
      </button>
    </FocusContext.Provider>
  );
};
