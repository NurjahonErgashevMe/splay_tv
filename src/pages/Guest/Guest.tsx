import { FC, useEffect } from "react";
import s from "./guest.module.scss";
import Video from "public/assets/videos/guestVideo.mp4";
import SPLayLogo from "public/assets/image/SPlayLogo.svg";
import PLayIcon from "public/assets/icons/Play.svg";

import SVG from "react-inlinesvg";

import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { Center } from "@/components/Center/Center";
import { LinkButton } from "@/components/LinkButton/LinkButton";

interface GuestProps {
  focusKeyParam: string;
}

const Guest: FC<GuestProps> = ({ focusKeyParam }) => {
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey,
    // setFocus, -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts, -- to force update all layouts when needed
    // getCurrentFocusKey -- to get the current focus key
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: "",
    onEnterPress: () => {
      console.log("enter pass");
    },
    onEnterRelease: () => {
      console.log("enter release");
    },
    onArrowPress: () => false,
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: "bar" },
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  console.log(hasFocusedChild);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.guest} ref={ref}>
        <div className={s.videoWrapper}>
          <video autoPlay muted loop className={s.video}>
            <source src={Video} />
          </video>
        </div>
        <Center className={s.container}>
          <div className={s.logoWrapper}>
            <SVG src={SPLayLogo} width={145} height={74} className={s.logo} />
          </div>
          <Center className={s.content}>
            <h2 className={s.headingText}>
              Фильмы, сериалы, мултики разного жанра и многое другое без
              ограничений
            </h2>
            <p className={s.subtitleText}>
              Погрузитесь в мир S-PLAY, смотрите что угодно. Вас ждут более 1000
              Фильмов, Сериалов, Мультфильмов разного жанра, и многое другое
            </p>
            <LinkButton
              href="/signin-with-qrcode"
              variant="orange"
              className={s.button}
              aria-label="Начать-смотреть"
            >
              <SVG
                src={PLayIcon}
                width={15}
                height={18}
                className={s.playIcon}
              />
              НАЧАТЬ СМОТРЕТЬ
            </LinkButton>

            <LinkButton
              href="/signin-with-qrcode"
              variant="orange"
              className={s.button}
              aria-label="Начать-смотреть"
            >
              <SVG
                src={PLayIcon}
                width={15}
                height={18}
                className={s.playIcon}
              />
              НАЧАТЬ СМОТРЕТЬ
            </LinkButton>
          </Center>
        </Center>
      </div>
    </FocusContext.Provider>
  );
};

export default Guest;
