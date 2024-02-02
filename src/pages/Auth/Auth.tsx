import { FC, useEffect } from "react";

import s from "./auth.module.scss";

import Input from "@/components/Input/Input";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { Button } from "@/components/Button/Button";

const Auth: FC = () => {
  const { focusKey, focusSelf, ref } = useFocusable();
  useEffect(() => {
    focusSelf();
  }, [focusSelf]);
  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <Button variant="glass" focusedClassName="orange">
          hello
        </Button>
        <Button variant="glass" focusedClassName="orange">
          hello
        </Button>
        <Input label="name-" placeholder="Имя" />
        <Input label="login-password" placeholder="Введите пароль" password />
      </div>
    </FocusContext.Provider>
  );
};

export default Auth;
