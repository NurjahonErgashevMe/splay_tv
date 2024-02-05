/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, useEffect } from "react";
import s from "./button.module.scss";
import cn from "classnames";
import {
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

export const variants: Record<Variants, string> = {
  orange: s.orange,
  black: s.black,
  dark: s.dark,
  transparent: s.transparent,
  glass: s.glass,
  transprentWithBottomOrder: s.transprentWithBottomOrder,
  unstyled: s.unstyled,
};
export const focusedVariants: Record<FocusedVariants, string> = {
  orange: s.focusOrange,
  black: s.focusBlack,
  dark: s.focusDark,
  transparent: s.focusTransparent,
  glass: s.focusGlass,
  white: s.focusedWhite,
  transprentWithBottomOrder: s.focusedTransprentWithBottomOrder,
  unstyled: s.focusUnstyled,
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  focusedVariant,
  variant,
  disabled,
  focusedClassName,
  onPress,
  onFocus,
  focusedSelf = false,
  ...buttonProps
}) => {
  const { ref, focused, focusKey, focusSelf } = useFocusable({
    onFocus,
    onEnterPress: onPress,
    extraProps: { component: "button" },
  });

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <button
        ref={ref}
        className={cn(
          s.button,
          variants[variant],
          disabled ? s.disabled : null,
          {
            [focusedVariants[focusedVariant as FocusedVariants]]:
              focusedVariant && focused,
          },
          className,
          focused ? focusedClassName : null
        )}
        disabled={disabled}
        {...buttonProps}
      >
        {children}
      </button>
    </FocusContext.Provider>
  );
};

export type Variants =
  | "orange"
  | "dark"
  | "transparent"
  | "black"
  | "glass"
  | "transprentWithBottomOrder"
  | "unstyled";

export type FocusedVariants = Variants | "white";

export type ButtonProps = {
  variant: Variants;
  href?: string;
  focusedClassName?: string;
  focusedVariant?: FocusedVariants;
  onPress?: (props?: any, details?: KeyPressDetails) => void;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  focusedSelf?: boolean;
} & Partial<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;
