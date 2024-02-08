import { DetailedHTMLProps, FC, useCallback, useEffect, useState } from "react";
import s from "./input.module.scss";
import {
  FocusContext,
  UseFocusableConfig,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import PasswordIcon from "./components/Password";
import InputContent from "./components/InputContent";
import classNames from "classnames";

const Input: FC<InputProps> = (props) => {
  const {
    password,
    label,
    onEnterPress,
    focusedSelf,
    placeholder,
    value,
    error,
    onFocus,
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
  } = props;
  const { ref, focusKey, focusSelf, hasFocusedChild } = useFocusable({
    extraProps,
    onEnterPress,
    trackChildren: true,
    onFocus,
    focusKey: PropsFocusKey,
    onBlur,
    forceFocus,
    focusable,
    isFocusBoundary,
    focusBoundaryDirections,
    autoRestoreFocus,
    onArrowPress,
    onEnterRelease,
    preferredChildFocusKey,
    saveLastFocusedChild,
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
          onEnterPress={onEnterPress}
          type={typeAttribute}
          onArrowPress={onArrowPress}
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
  UseFocusableConfig<object>;
