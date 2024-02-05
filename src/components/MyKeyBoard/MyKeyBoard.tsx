import { FC, useEffect, useState } from "react";
import s from "./myKeyBoard.module.scss";
import { letters } from "@/shared/letters";
import { Button } from "../Button/Button";
import {
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { numbers } from "@/shared/numbers";
import useKeyPress from "@/hooks/useKeyPress";

const MyKeyBoard: FC<KeyBoardProps> = ({
  onFocus,
  onPress,
  focusedSelf = false,
}) => {
  const enterPressed = useKeyPress("Enter");

  const [type, setType] = useState<"letters" | "number">("letters");
  const [symbol, setSymbol] = useState<string | null>(null);

  console.log(symbol);

  const { focused, focusKey, focusSelf, ref } = useFocusable({
    onFocus: onFocus,
    onEnterPress: (e) => console.log(type, "pressed"),
    extraProps: { symbol },
  });

  const currentSymbols: string[] = type === "letters" ? letters : numbers;

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.myKeyBoard} ref={ref}>
        <div className={s.letters}>
          {currentSymbols?.map((item, index) => (
            <button
              className={s.button}
              key={index}
              on={() => setSymbol(() => item)}
            >
              {item}
            </button>
          ))}
        </div>
        <Button
          variant="dark"
          className={s.button}
          focusedClassName={s.focused}
          onPress={() =>
            setType((prev) => (prev === "letters" ? "number" : "letters"))
          }
        >
          {type === "letters" ? "123?" : "abc"}
        </Button>
        <div className={s.functionality}></div>
      </div>
    </FocusContext.Provider>
  );
};

type KeyBoardProps = {
  onPress?: (props: object, details: KeyPressDetails) => void;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
  focusedSelf?: boolean;
};

export default MyKeyBoard;
