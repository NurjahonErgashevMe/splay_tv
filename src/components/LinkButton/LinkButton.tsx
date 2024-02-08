/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, HTMLProps, PropsWithChildren } from "react";

import s from "../Button/button.module.scss";
import cn from "classnames";

import {
  Link,
  LinkProps,
  To,
  useNavigate,
} from "react-router-dom";
import {
  FocusContext,
  UseFocusableConfig,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { LinkButtonExtraProps } from "@/types/extraProps/LinkButton";
import {
  FocusedVariants,
  Variants,
  focusedVariants,
  variants,
} from "../Button/Button";

export const LinkButton: FC<LinkButtonProps> = (props) => {
  const {
    children,
    variant,
    disabled = false,
    href,
    className,
    focusedClassName,
    onFocus,
    onEnterPress,
    onArrowPress,
    focusKey: PropsFocusKey,
    forceFocus,
    isFocusBoundary,
    extraProps,
    preferredChildFocusKey,
    onBlur,
    autoRestoreFocus,
    saveLastFocusedChild,
    focusable,
    focusBoundaryDirections,
    onEnterRelease,
    focusedVariant,
    ...buttonProps
  } = props;

  const navigation = useNavigate();
  const { ref, focused, focusKey } = useFocusable<LinkButtonExtraProps>({
    onFocus,
    onEnterPress: (props, details) => {
      if (onEnterPress) {
        return onEnterPress?.(props, details);
      }
      return navigation(href);
    },
    extraProps,
    focusKey: PropsFocusKey,
    forceFocus,
    autoRestoreFocus,
    onBlur,
    focusable,
    focusBoundaryDirections,
    isFocusBoundary,
    onArrowPress,
    onEnterRelease,
    preferredChildFocusKey,
    saveLastFocusedChild,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <Link
        ref={ref as any}
        to={href}
        className={cn(
          s.button,
          variants[variant],
          disabled ? s.disabled : null,
          focused ? s.focused : null,
          {
            [focusedVariants[focusedVariant as FocusedVariants]]:
              focusedVariant && focused,
          },
          className,
          focused ? focusedClassName : null
        )}
        {...buttonProps}
      >
        {children}
      </Link>
    </FocusContext.Provider>
  );
};

type LinkButtonProps = PropsWithChildren<{
  variant: Variants;
  focusedClassName?: string;
  focusedVariant?: FocusedVariants;
  href: To;
  disabled?: boolean;
  className?: string;
}> &
  Partial<LinkProps & HTMLProps<HTMLAnchorElement>> &
  UseFocusableConfig<LinkButtonExtraProps>;
