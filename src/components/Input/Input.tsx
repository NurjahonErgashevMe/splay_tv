import { DetailedHTMLProps, FC, useCallback, useEffect, useState } from "react";
import s from "./input.module.scss";
import {
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import PasswordIcon from "./components/Password";
import InputContent from "./components/InputContent";
import classNames from "classnames";

const Input: FC<InputProps> = (props) => {
  const { password, onFocus, onPress, focusedSelf = false } = props;

  const { ref, focused, focusKey, focusSelf } = useFocusable({
    extraProps: { hello: "string" },
    onEnterPress: onPress,
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
        className={classNames(s.inputWrapper, focused ? s.focused : null)}
      >
        <InputContent {...props} />
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
  error?: boolean;
  onPress?: (props: object, details: KeyPressDetails) => void;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  focusedSelf?: boolean;
} & DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
