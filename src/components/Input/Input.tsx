import { DetailedHTMLProps, FC, useCallback, useEffect, useState } from "react";
import s from "./input.module.scss";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import PasswordIcon from "./components/Password";
import InputContent from "./components/InputContent";
import classNames from "classnames";

interface InputProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  password?: boolean;
  label: string;
  placeholder: string;
  error?: boolean;
}

const Input: FC<InputProps> = (props) => {
  const { password } = props;
  
  const { ref, focused, focusKey } = useFocusable({
    extraProps: { hello: "string" },
    onEnterPress: (e) => console.log(e),
  });

  const [typeAttribute, setTypeAttribute] = useState<"text" | "password">(
    password ? "password" : "text"
  );

  const changeTypeAtribute = useCallback((type: "text" | "password") => {
    setTypeAttribute(type);
  }, []);

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
