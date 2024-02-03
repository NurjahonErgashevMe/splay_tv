import { FC, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import images using absolute paths for clarity
import TVImage from "/public/assets/image/tv.png";
import Logo from "/public/assets/image/SPlayLogo.svg";

import SVG from "react-inlinesvg";
import s from "./screen.module.scss";

import { mock_screen } from "@/shared/mocks/screen";
import { Img } from "react-image";
import { Center } from "@/components/Center/Center";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

const Screen: FC = () => {
  const navigation = useNavigate();
  const { screen } = useParams();
  const screenId = Number(screen);
  const { focusKey, focusSelf, ref } = useFocusable({
    onEnterPress: () =>
      navigation(
        screenId === mock_screen.length ? "/auth" : `/screen/${screenId + 1}`
      ),
  });

  const screenData = useMemo(() => {
    return mock_screen[screenId - 1 ?? 0];
  }, [mock_screen, screenId]);

  const { title, description, screenshot } = screenData;

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.screen} ref={ref}>
        <Center gap="3.125rem" className={s.container}>
          {/* Use semantic HTML for better SEO */}
          <header className={s.logoWrapper}>
            <SVG src={Logo} width={"100%"} height={"auto"} className={s.logo} />
          </header>
          <main>
            <h2 className={s.title}>{title}</h2>
            <p className={s.description}>{description}</p>
            <div className={s.tv}>
              <Img
                src={TVImage}
                loading="lazy"
                width={"100%"}
                height={"auto"}
                srcSet={TVImage}
                className={s.tvImage}
              />
              <Img
                src={screenshot}
                loading="lazy"
                width={"100%"}
                height={"auto"}
                className={s.screenImage}
                srcSet={screenshot}
              />
            </div>
          </main>
        </Center>
      </div>
    </FocusContext.Provider>
  );
};

export default Screen;
