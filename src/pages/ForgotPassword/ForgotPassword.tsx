import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./forgotPassword.module.scss";

import { Center } from "@/components/Center/Center";
import Input from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import MyKeyBoard from "@/components/MyKeyBoard/MyKeyBoard";
import { Flex } from "@/components/Flex/Flex";
import GoToPrevious from "@/components/GoToPrevious/GoToPrevios";
import {
  FocusContext,
  FocusableComponentLayout,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

const ForgotPassword: FC = () => {
  const navigation = useNavigate();
  const scrollingRef = useRef<HTMLDivElement>(null);

  const { focusKey, focusSelf, ref } = useFocusable();

  // input values
  const [login, setLogin] = useState<string>("");

  const changeLoginValue = useCallback((func: "del" | null, value?: string) => {
    if (func) {
      setLogin((prev) => prev.slice(0, prev.length - 1));
    } else {
      setLogin((prev) => prev + value);
    }
  }, []);

  const onAssetFocus = useCallback(
    ({ top }: FocusableComponentLayout) => {
      scrollingRef?.current?.scrollTo({
        top,
        behavior: "smooth",
      });
    },
    [scrollingRef]
  );

  const navigateToConfirm = () => {
    if (!login) {
      return;
    }
    return navigation("/password-confirm");
  };

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.forgotPassword} ref={ref}>
        <Center
          gap="4rem"
          justifyContent="space-between"
          className={s.container}
          ref={scrollingRef}
        >
          <GoToPrevious previous={"/register"} />
          <div className={s.form}>
            <Flex flexDirection="column" gap="1.5rem" className={s.text}>
              <h3 className={s.title}> Забыли пароль? Ничего страшного</h3>
              <p className={s.description}>
                E-mail или Телефон, который вы указалипри регистрации, и мы
                отправим вам инструкциюпо восстановлении пароля
              </p>
            </Flex>
            <Flex
              flexDirection="column"
              gap="1.5rem"
              className={s.interactivity}
            >
              <Input
                label="login"
                placeholder="Email или Номер телефона"
                value={login}
                usingFocusClassName
                className={s.input}
                onFocus={() =>
                  onAssetFocus({ top: 0 } as FocusableComponentLayout)
                }
              />
              <Button
                disabled={!login}
                ignore={!login}
                className={s.button}
                variant="black"
                focusedVariant={!login ? "black" : "orange"}
                onEnterPress={navigateToConfirm}
                onFocus={() =>
                  onAssetFocus({ top: 0 } as FocusableComponentLayout)
                }
              >
                Продоллжить
              </Button>
            </Flex>
          </div>
          <div className={s.keyboard}>
            <MyKeyBoard
              onFocus={(param) => {
                console.log("keyboard focus", param.top);
                onAssetFocus(param);
              }}
              focusedSelf
              focusBoundaryDirections={["up"]}
              isFocusBoundary={!login}
              onEnterPress={(value) => {
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
    </FocusContext.Provider>
  );
};

export default ForgotPassword;
