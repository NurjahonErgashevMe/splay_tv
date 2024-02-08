import { FC, useEffect } from "react";

import s from "../button.module.scss";
import cn from "classnames";

import {
  ButtonProps,
  FocusedVariants,
  focusedVariants,
  variants,
} from "../Button";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

const ButtonWithFocus: FC<ButtonProps> = (props) => {
  const {
    children,
    variant,
    disabled = false,
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
    focusedSelf,
    ignore = false,
    ...buttonProps
  } = props;

  const { ref, focused, focusKey, focusSelf } = useFocusable({
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
  });

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, [focusSelf, focusedSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <button
        ref={ignore ? null : ref}
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

export default ButtonWithFocus;