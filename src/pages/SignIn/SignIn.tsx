import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import s from "./signIn.module.scss";

import QRCode from "public/assets/image/QRCode.svg";
import CodeSymbol from "public/assets/icons/Code-symbol.svg";

import SVG from "react-inlinesvg";
import {
  FocusContext,
  FocusableComponentLayout,
  setFocus,
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
import { usePrevious } from "@/hooks/usePrevious";

const tabs: TTab[] = [
  {
    title: "Войти в аккаунт",
    href: "/signin",
    active: true,
  },
  {
    title: "Зарегистрироваться",
    href: "/register",
  },
];

const SignIn: FC = () => {
  const { focusKey, focusSelf, ref } = useFocusable({
    trackChildren: true,
  });
  const [currentFocusKey, setCurrentFocusKey] = useState<string | null>(null);

  const previousFocusKey = usePrevious(currentFocusKey);

  const navigate = useNavigate();

  const scrollingRef = useRef<HTMLDivElement>(null);

  const [whichInputOpened, setWiсhInputOpened] = useState<
    "login" | "password" | null
  >(null);

  // input values
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const focusPreviousComponent = useCallback(
    (arrow: string, whenArrowIs: string): boolean => {
      if (arrow === whenArrowIs) {
        setFocus("PREVIOUS_COMPONENT_FOCUS_KEY");
      }
      return true;
    },
    []
  );

  const outPreviousComponent = useCallback(
    (arrow: string, whenArrowIs: string, key: string): boolean => {
      if (arrow === whenArrowIs) {
        setFocus(previousFocusKey ?? key);
      }
      return true;
    },
    [previousFocusKey]
  );

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
        <GoToPrevious
          onArrowPress={(arrow) =>
            outPreviousComponent(arrow, "right", "PREVIOUS_COMPONENT_FOCUS_KEY")
          }
          previous={"/guest"}
          fixed={false}
          className={s.prev}
          onFocus={() =>
            setCurrentFocusKey(() => "PREVIOUS_COMPONENT_FOCUS_KEY")
          }
        />
        <div className={s.container}>
          <div className={s.form} ref={scrollingRef}>
            <Tabs tabs={tabs} />
            <Center className={s.tabtext}>
              Войдите свой аккаунт чтобы начать пользоваться сервисом Splay
            </Center>
            <div className={s.inputs}>
              <Input
                focusKey="SIGNIN_LOGIN_INPUT"
                value={login}
                focusedSelf={whichInputOpened === "login" || !whichInputOpened}
                label="email-or-phoneNumber"
                onFocus={() => {
                  onAssetFocus({ top: 0 } as FocusableComponentLayout);
                  setCurrentFocusKey("SIGNIN_LOGIN_INPUT");
                }}
                onEnterPress={() => onInputPress("login")}
                placeholder="Введите E-mail или Номер телефона"
                usingFocusClassName={whichInputOpened === "login"}
                onArrowPress={(arrow) => focusPreviousComponent(arrow, "left")}
              />
              <Input
                focusKey="SIGNIN_PASSWORD_INPUT"
                onFocus={() => {
                  onAssetFocus({ top: 0 } as FocusableComponentLayout);
                  setCurrentFocusKey("SIGNIN_PASSWORD_INPUT");
                }}
                focusedSelf={whichInputOpened === "password"}
                onEnterPress={() => onInputPress("password")}
                label="password"
                placeholder="Введите пароль"
                usingFocusClassName={whichInputOpened === "password"}
                password
                value={password}
                onArrowPress={(arrow) => focusPreviousComponent(arrow, "left")}
              />
              <LinkButton
                onFocus={() => {
                  setCurrentFocusKey("SIGNIN_FORGOT_PASSWORD_LINK");
                }}
                focusKey="SIGNIN_FORGOT_PASSWORD_LINK"
                variant="unstyled"
                focusedVariant="unstyled"
                href={"/forgot-password"}
                onArrowPress={(arrow) => focusPreviousComponent(arrow, "left")}
              >
                Забыли пароль?
              </LinkButton>
            </div>
            <Button
              focusKey="SIGNIN_SIGNIN_BUTTON"
              variant="black"
              focusedVariant={ "orange"}
              disabled={loginButtonDisable}
              ignore={loginButtonDisable}
              onArrowPress={(arrow) => focusPreviousComponent(arrow, "left")}
              onEnterPress={() => {
                if (!loginButtonDisable) {
                  navigate("/home");
                }
              }}
              onFocus={() => {
                onAssetFocus({ top: 0 } as FocusableComponentLayout);
                setCurrentFocusKey("SIGNIN_SIGNIN_BUTTON");
              }}
            >
              Войти
            </Button>
            <DividerWithText text="ИЛИ" />
            <LinkButton
              focusKey="SIGNIN_SIGNIN_WITH_QR_CODE_BUTTON"
              onFocus={() => {
                onAssetFocus({ top: 0 } as FocusableComponentLayout);
                setCurrentFocusKey("SIGNIN_SIGNIN_WITH_QR_CODE_BUTTON");
              }}
              onArrowPress={(arrow) => focusPreviousComponent(arrow, "left")}
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
              focusKey="SIGNIN_SIGNIN_WITH_CODE_BUTTON"
              onArrowPress={(arrow) => focusPreviousComponent(arrow, "left")}
              onFocus={(e) => {
                onAssetFocus(e as FocusableComponentLayout);
                setCurrentFocusKey("SIGNIN_SIGNIN_WITH_CODE_BUTTON");
              }}
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
                onEnterPress={(e) => {
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
