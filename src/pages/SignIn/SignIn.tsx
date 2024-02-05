import { FC, useCallback, useEffect, useRef, useState } from "react";

import s from "./signIn.module.scss";

import QRCode from "public/assets/image/QRCode.svg";
import CodeSymbol from "public/assets/icons/Code-symbol.svg";

import cn from "classnames";
import SVG from "react-inlinesvg";
import { Button } from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import {
  FocusContext,
  FocusableComponentLayout,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { Center } from "@/components/Center/Center";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import DividerWithText from "@/components/Divider/Divider";
import GoToPrevious from "@/components/GoToPrevious/GoToPrevios";
import MyKeyBoard from "@/components/MyKeyBoard/MyKeyBoard";

const SignIn: FC = () => {
  const { focusKey, focusSelf, ref } = useFocusable();
  const [whichInputOpened, setWithInputOpened] = useState<
    "login" | "password" | null
  >(null);

  // input values
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const scrollingRef = useRef<HTMLDivElement>(null);

  const onAssetFocus = useCallback(
    ({ top }: FocusableComponentLayout) => {
      scrollingRef?.current?.scrollTo({
        top,
        behavior: "smooth",
      });
    },
    [scrollingRef]
  );

  const onInputPress = useCallback((name: "login" | "password") => {
    setWithInputOpened(name);
  }, []);

  const handleInputChange = (value: string, name: "login" | "password") => {
    if (name === "login") {
      setPassword(value);
      return;
    }
    setLogin(value);
  };

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.signIn} ref={ref}>
        <GoToPrevious previous={"/guest"} />
        <div className={s.container}>
          <div className={s.form} ref={scrollingRef}>
            <div className={s.tabs}>
              <span className={cn(s.tab, s.signin)}>Войти в аккаунт</span>
              <span className={cn(s.tab, s.register)}>Зарегистрироваться</span>
            </div>
            <p className={s.tabtext}>
              Войдите свой аккаунт чтобы начать пользоваться сервисом Splay
            </p>
            <div className={s.inputs}>
              <Input
                focusedSelf
                label="email-or-phoneNumber"
                onFocus={() =>
                  onAssetFocus({ top: 0 } as FocusableComponentLayout)
                }
                onPress={() => onInputPress("login")}
                placeholder="Введите E-mail или Номер телефона"
              />
              <Input
                onFocus={() =>
                  onAssetFocus({ top: 0 } as FocusableComponentLayout)
                }
                onPress={() => onInputPress("password")}
                label="password"
                placeholder="Введите пароль"
              />
              <LinkButton
                variant="unstyled"
                focusedVariant="unstyled"
                href={"/forgot-password"}
              >
                Забыли пароль?
              </LinkButton>
            </div>
            <Button variant="black" focusedVariant="orange">
              Войти
            </Button>
            <DividerWithText text="ИЛИ" />
            <LinkButton
              onFocus={(e) => onAssetFocus(e as FocusableComponentLayout)}
              href={"/signin-with-qrcode"}
              variant="transprentWithBottomOrder"
              focusedVariant="transparent"
            >
              <Center flexDirection="row" gap="1.25rem">
                <SVG src={QRCode} width={24} height={24} />
                Войти через QR-коду
              </Center>
            </LinkButton>
            <LinkButton
              onFocus={(e) => onAssetFocus(e as FocusableComponentLayout)}
              href={"/signin-with-code"}
              variant="transprentWithBottomOrder"
              focusedVariant="transparent"
            >
              <Center flexDirection="row" gap="1.25rem">
                <SVG src={CodeSymbol} width={24} fill="#fff" height={24} />
                Войти через код
              </Center>
            </LinkButton>
          </div>
          {whichInputOpened ? (
            <div className={s.keyboard}>
              <MyKeyBoard
                onPress={(e) => {
                  console.log(e);
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default SignIn;
