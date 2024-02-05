import { FC, useCallback, useState } from "react";

import s from "./forgotPassword.module.scss";
import { Center } from "@/components/Center/Center";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import MyKeyBoard from "@/components/MyKeyBoard/MyKeyBoard";
import { Flex } from "@/components/Flex/Flex";
import GoToPrevious from "@/components/GoToPrevious/GoToPrevios";

const ForgotPassword: FC = () => {
  // input values
  const [login, setLogin] = useState<string>("");

  const changeLoginValue = useCallback((func: "del" | null, value?: string) => {
    if (func) {
      setLogin((prev) => prev.slice(0, prev.length - 1));
    } else {
      setLogin((prev) => prev + value);
    }
  }, []);

  return (
    <div className={s.forgotPassword}>
      <Center gap="4rem" justifyContent="space-between" className={s.container}>
        <GoToPrevious previous={"/register"} />
        <div className={s.form}>
          <Flex flexDirection="column" gap="1.5rem" className={s.text}>
            <h3 className={s.title}> Забыли пароль? Ничего страшного</h3>
            <p className={s.description}>
              E-mail или Телефон, который вы указалипри регистрации, и мы
              отправим вам инструкциюпо восстановлении пароля
            </p>
          </Flex>
          <Flex flexDirection="column" gap="1.5rem" className={s.interactivity}>
            <Input
              label="login"
              placeholder="Email или Номер телефона"
              value={login}
              focusedSelf
              usingFocusClassName
              className={s.input}
            />
            <Button
              disabled={!login}
              className={s.button}
              variant="black"
              focusedVariant={!login ? "black" : "orange"}
            >
              Продоллжить
            </Button>
          </Flex>
        </div>
        <div className={s.keyboard}>
          <MyKeyBoard
            onPress={(value) => {
              if (value?.letter === "del") {
                changeLoginValue("del");
              } else {
                changeLoginValue(null, value?.letter);
              }
            }}
          />
        </div>
      </Center>
    </div>
  );
};

export default ForgotPassword;
