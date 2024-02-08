/* eslint-disable react-refresh/only-export-components */
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import s from "./button.module.scss";
import { UseFocusableConfig } from "@noriginmedia/norigin-spatial-navigation";
import ButtonWithoutFocus from "./components/ButtonWithoutFocus";
import ButtonWithFocus from "./components/ButtonWithFocus";

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

export const Button: FC<ButtonProps> = (props) => {
  if (props.ignore) {
    return <ButtonWithoutFocus {...props} />;
  }
  return <ButtonWithFocus {...props} />;
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
  focusedSelf?: boolean;
  ignore?: boolean;
} & Partial<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> &
  UseFocusableConfig<object>;
