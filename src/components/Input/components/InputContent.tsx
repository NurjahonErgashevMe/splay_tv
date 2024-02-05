import { FC, HTMLProps, memo, useEffect } from "react";
import s from "../input.module.scss";

import cn from "classnames";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { Focusable } from "@/types/focusable";

const InputContent: FC<InputProps> = memo(
  ({ error = false, placeholder, value, password, onPress, ...props }) => {
    const { focusKey, focusSelf, ref } = useFocusable({
      onEnterPress: onPress,
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
} & Focusable<object>;

export default InputContent;
