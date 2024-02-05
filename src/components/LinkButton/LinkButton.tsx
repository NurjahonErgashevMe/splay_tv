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
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { LinkButtonExtraProps } from "@/types/extraProps/LinkButton";
import {
  FocusedVariants,
  Variants,
  focusedVariants,
  variants,
} from "../Button/Button";

type LinkButtonProps = PropsWithChildren<{
  variant: Variants;
  focusedClassName?: string;
  focusedVariant?: FocusedVariants;
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
