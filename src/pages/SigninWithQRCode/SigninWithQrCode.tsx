import { FC, useEffect } from "react";
import s from "./signinWithQrCode.module.scss";

import QRCodeImage from "public/assets/image/QRCode.svg";
import SVG from "react-inlinesvg";
import { Center } from "@/components/Center/Center";
import { Flex } from "@/components/Flex/Flex";
import GoToPrevious from "@/components/GoToPrevious/GoToPrevios";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
const SigninWithQrCode: FC = () => {
  const { focusSelf, focusKey } = useFocusable({
    onArrowPress: () => true,
  });
  useEffect(() => {
    focusSelf();
  }, []);
  return (
    <FocusContext.Provider value={focusKey}>
      <Center className={s.SigninWithQrCode}>
        <GoToPrevious />
        <div className={s.container}>
          <div className={s.qrcode}>
            <SVG
              src={QRCodeImage}
              className={s.qrcodeImage}
              loader={<span>Yuklanmoqda...</span>}
            />
          </div>
          <Flex flexDirection="column" gap="30px" className={s.text}>
            <h2 aria-label="signin with qr code " className={s.heading}>
              Вход по QR-Коду
            </h2>
            <Flex gap="2rem" flexDirection="column" className={s.steps}>
              <span className={s.step}>
                1) Откройте платформу в вашем мобильном устройстве
              </span>
              <span className={s.step}>
                2) Перейдите в “Аккаунт” далее “Cессии” и нажмите на кнопку
                “Добавить устройства”
              </span>
              <span className={s.step}>3) Отсканируйте QR-код</span>
            </Flex>
          </Flex>
        </div>
      </Center>
    </FocusContext.Provider>
  );
};

export default SigninWithQrCode;
