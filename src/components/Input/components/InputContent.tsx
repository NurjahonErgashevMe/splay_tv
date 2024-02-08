import { FC, HTMLProps, memo, useEffect } from "react";
import s from "../input.module.scss";

import cn from "classnames";
import {
  FocusContext,
  UseFocusableConfig,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

const InputContent: FC<InputProps> = memo(
  ({
    error = false,
    placeholder,
    value,
    password,
    onEnterPress,
    onArrowPress,
    ...props
  }) => {
    const { focusKey, focusSelf, ref } = useFocusable({
      onEnterPress,
      onArrowPress,
    });

    useEffect(() => {
      if (password) {
        focusSelf();
      }
    }, [focusSelf, password]);
    return (
      <FocusContext.Provider value={focusKey}>
        <input
          ref={ref}
          placeholder={placeholder}
          value={value}
          className={cn(
            s.inputContent,
            error ? s.error : null,
            props.className
          )}
          {...props}
        />
      </FocusContext.Provider>
    );
  }
);

type InputProps = HTMLProps<HTMLInputElement> & {
  password?: boolean;
  label: string;
  error?: boolean;
} & UseFocusableConfig<object>;

export default InputContent;