import { DetailedHTMLProps, FC, useCallback, useEffect, useState } from "react";
import s from "./input.module.scss";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import PasswordIcon from "./components/Password";
import InputContent from "./components/InputContent";
import classNames from "classnames";
import { Focusable } from "@/types/focusable";

const Input: FC<InputProps> = (props) => {
  const {
    password,
    label,
    onPress,
    focusedSelf,
    placeholder,
    value,
    error,
    onFocus,
  } = props;
  const { ref, focusKey, focusSelf, hasFocusedChild } = useFocusable({
    extraProps: { hello: "string" },
    onEnterPress: onPress,
    trackChildren: true,
    onFocus,
  });

  const [typeAttribute, setTypeAttribute] = useState<"text" | "password">(
    password ? "password" : "text"
  );

  const changeTypeAtribute = useCallback((type: "text" | "password") => {
    setTypeAttribute(type);
  }, []);

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, [focusSelf, focusedSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={classNames(s.inputWrapper, {
          [s.focused]: hasFocusedChild || props.usingFocusClassName,
        })}
      >
        <InputContent
          value={value}
          label={label}
          placeholder={placeholder}
          error={error}
          onPress={onPress}
          type={typeAttribute}
        />
        {password ? (
          <PasswordIcon type={typeAttribute} setType={changeTypeAtribute} />
        ) : null}
      </div>
    </FocusContext.Provider>
  );
};

export default Input;

type InputProps = {
  password?: boolean;
  label: string;
  placeholder: string;
  focusedSelf?: boolean;
  value: string;
  error?: boolean;
  usingFocusClassName?: boolean;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  Focusable<object>;
