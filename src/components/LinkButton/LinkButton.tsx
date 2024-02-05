/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, HTMLProps, PropsWithChildren } from "react";
import s from "../Button/button.module.scss";
import cn from "classnames";
import {
  Link,
  LinkProps,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { LinkButtonExtraProps } from "@/types/extraProps/LinkButton";
import {
  FocusedVariants,
  Variants,
  focusedVariants,
  variants,
} from "../Button/Button";
import { Focusable } from "@/types/focusable";

export const LinkButton: FC<LinkButtonProps> = ({
  children,
  variant,
  disabled = false,
  href,
  className,
  focusedClassName,
  onFocus,
  onPress,
  focusedVariant,
  ...buttonProps
}) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { ref, focused, focusKey } = useFocusable<LinkButtonExtraProps>({
    onFocus,
    onEnterPress: (props, details) => {
      if (onPress) {
        return onPress?.(props, details);
      }
      return navigation(href);
    },
    extraProps: { clicked: true, to: href, current: location },
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
  Focusable<LinkButtonExtraProps, object>;
