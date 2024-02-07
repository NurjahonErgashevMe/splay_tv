import { FC, useCallback, useEffect, useRef, useState } from "react";

import s from "./confirmPassword.module.scss";
import { useInterval } from "@/hooks/useInterval";
import { Button } from "@/components/Button/Button";
import NumberKeyboard from "@/components/NumberKeyboard/NumberKeyboard";
import {
  FocusContext,
  FocusableComponentLayout,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { Center } from "@/components/Center/Center";
import { Flex } from "@/components/Flex/Flex";
import GoToPrevious from "@/components/GoToPrevious/GoToPrevios";

const ConfirmPassword: FC = () => {
  const [codes, setCodes] = useState<number[]>([]);
  const [resend, setResend] = useState<number>(30);

  const scrollingRef = useRef<HTMLDivElement>(null);

  const { focusKey, focusSelf, ref } = useFocusable();

  const disable = codes.length !== 6;
  const keyboardDisable = !resend || !disable;

  const onAssetFocus = useCallback(
    ({ top }: FocusableComponentLayout) => {
      scrollingRef?.current?.scrollTo({
        top,
        behavior: "smooth",
      });
    },
    [scrollingRef]
  );

  const handleRemoveCode = useCallback(() => {
    return setCodes((prev) => prev.slice(0, prev.length - 1));
  }, []);
  const handleAddCode = useCallback(
    (number: number) => {
      if (!disable) {
        return;
      }
      return setCodes((prev) => [...prev, number]);
    },
    [disable]
  );

  const interval = useInterval(() => {
    if (!resend) {
      return;
    }
    return setResend((s) => s - 1);
  }, 1000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, [interval]);

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.confirmPassword} ref={ref}>
        <GoToPrevious previous={"/register"} />
        <Center
          gap="1.625rem"
          justifyContent="space-between"
          className={s.container}
          ref={scrollingRef}
        >
          <div className={s.form}>
            <Flex flexDirection="column" gap="1.5rem" className={s.texts}>
              <h3 className={s.title}>Подтвердите регистрацию</h3>
              <p className={s.description}>
                Мы отправили верификационный код на почту
                <span> saxir.radjabov@mail.ru</span>, введите этот код в поля
                ниже
              </p>
            </Flex>
            <Flex gap="10px" className={s.codes}>
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <Center className={s.code} key={index}>
                  {codes[index]}
                </Center>
              ))}
            </Flex>
            <Button
              variant="black"
              focusedVariant={disable ? "black" : "orange"}
              disabled={disable}
              isFocusBoundary={true}
              focusBoundaryDirections={["down", "up"]}
              onFocus={() =>
                onAssetFocus({ top: 0 } as FocusableComponentLayout)
              }
            >
              подтвердить
            </Button>
            {resend ? (
              <span>Запросить код повторно можно через {resend} секунд</span>
            ) : (
              <Button
                variant="transprentWithBottomOrder"
                focusedVariant="glass"
                isFocusBoundary={true}
                focusBoundaryDirections={["up", "down"]}
              >
                Отправить код повторно
              </Button>
            )}
          </div>
          <div className={s.keyboard}>
            <NumberKeyboard
              onDeletePress={handleRemoveCode}
              onPress={({ number }) => handleAddCode(number)}
              isFocusBoundary={!keyboardDisable}
              focusBoundaryDirections={["up"]}
              focusedSelf
              onFocus={onAssetFocus}
            />
          </div>
        </Center>
      </div>
    </FocusContext.Provider>
  );
};

export default ConfirmPassword;
