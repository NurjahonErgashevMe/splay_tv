import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./signIn.module.scss";

import QRCode from "public/assets/image/QRCode.svg";
import CodeSymbol from "public/assets/icons/Code-symbol.svg";

import SVG from "react-inlinesvg";
import {
  FocusContext,
  FocusableComponentLayout,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { Button } from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { Center } from "@/components/Center/Center";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import DividerWithText from "@/components/Divider/Divider";
import GoToPrevious from "@/components/GoToPrevious/GoToPrevios";
import MyKeyBoard from "@/components/MyKeyBoard/MyKeyBoard";
import Tabs from "@/components/Tabs/Tabs";
import { TTab } from "@/components/Tabs/Tab";

const tabs: TTab[] = [
  {
    title: "Войти в аккаунт",
    href: "/signin",
    active : true,
  },
  {
    title: "Зарегистрироваться",
    href: "/register",
  },
];

const SignIn: FC = () => {
  const { focusKey, focusSelf, ref } = useFocusable();

  const navigate = useNavigate();

  const [whichInputOpened, setWiсhInputOpened] = useState<
    "login" | "password" | null
  >(null);

  // input values
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

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
    setWiсhInputOpened(name);
  }, []);

  const handleInputChange = useCallback(
    (func: "del" | null, value?: string) => {
      if (func) {
        if (whichInputOpened === "login") {
          setLogin((prev) => prev.slice(0, prev.length - 1));
        } else {
          setPassword((prev) => prev.slice(0, prev.length - 1));
        }
      } else {
        if (whichInputOpened === "login") {
          setLogin((prev) => prev + value);
        } else {
          setPassword((prev) => prev + value);
        }
      }
    },
    [whichInputOpened]
  );

  const loginButtonDisable = !login || !password;

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.signIn} ref={ref}>
        <GoToPrevious previous={"/guest"} fixed={false} className={s.prev} />
        <div className={s.container}>
          <div className={s.form} ref={scrollingRef}>
            <Tabs tabs={tabs} />
            <Center  className={s.tabtext}>
              Войдите свой аккаунт чтобы начать пользоваться сервисом Splay
            </Center>
            <div className={s.inputs}>
              <Input
                value={login}
                focusedSelf={whichInputOpened === "login" || !whichInputOpened}
                label="email-or-phoneNumber"
                onFocus={() =>
                  onAssetFocus({ top: 0 } as FocusableComponentLayout)
                }
                onPress={() => onInputPress("login")}
                placeholder="Введите E-mail или Номер телефона"
                usingFocusClassName={whichInputOpened === "login"}
              />
              <Input
                onFocus={() =>
                  onAssetFocus({ top: 0 } as FocusableComponentLayout)
                }
                focusedSelf={whichInputOpened === "password"}
                onPress={() => onInputPress("password")}
                label="password"
                placeholder="Введите пароль"
                usingFocusClassName={whichInputOpened === "password"}
                password
                value={password}
              />
              <LinkButton
                variant="unstyled"
                focusedVariant="unstyled"
                href={"/forgot-password"}
              >
                Забыли пароль?
              </LinkButton>
            </div>
            <Button
              variant="black"
              focusedVariant={loginButtonDisable ? "black" : "orange"}
              disabled={loginButtonDisable}
              onPress={() => {
                if (!loginButtonDisable) {
                  navigate("/home");
                }
              }}
            >
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
                  if (e?.letter === "del") {
                    return handleInputChange("del");
                  }
                  handleInputChange(null, e?.letter);
                }}
                onEnterPressed={() => {
                  if (whichInputOpened === "login") {
                    onInputPress("password");
                  } else if (
                    whichInputOpened === "password" &&
                    !loginButtonDisable
                  ) {
                    navigate("/home");
                  }
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