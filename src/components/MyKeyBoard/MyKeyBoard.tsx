import { FC, memo, useCallback, useEffect, useState } from "react";

import s from "./myKeyBoard.module.scss";

import { Button } from "../Button/Button";

import {
  IconArrowNarrowRight,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconSpace,
} from "@tabler/icons-react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import cn from "classnames";

import { TLetter, letters } from "@/shared/letters";
import { numbers } from "@/shared/numbers";
import { Focusable } from "@/types/focusable";

const MyKeyBoard: FC<KeyBoardProps> = memo(
  ({ onFocus, onPress, focusedSelf = false, onEnterPressed }) => {
    const [type, setType] = useState<"letters" | "number">("letters");
    const [upperCase, setUpperCase] = useState<boolean>(false);
    const { focusKey, focusSelf, ref } = useFocusable({
      onFocus: onFocus,
      onEnterPress: () => console.log(type, "pressed"),
    });

    const currentSymbols: (TLetter | string)[] =
      type === "letters" ? letters : numbers;

    const handleCapsLock = useCallback((upperCase?: boolean) => {
      return setUpperCase((prev) => upperCase ?? !prev);
    }, []);

    const toCase = (word: string, theCase: "upper" | "lower"): string => {
      return theCase === "upper" ? word.toUpperCase() : word.toLowerCase();
    };

    const handlePress = useCallback(
      (letter: string | "del") => {
        if (letter === "del") {
          return onPress?.({ letter: "del" }, { pressedKeys: {} });
        }
        const letterWithCase = upperCase ? letter.toUpperCase() : letter;
        return onPress?.({ letter: letterWithCase }, { pressedKeys: {} });
      },
      [onPress, upperCase]
    );
    const handleEnter = useCallback(() => {
      onEnterPressed?.(true);
    }, [onEnterPressed]);

    useEffect(() => {
      if (focusedSelf) {
        focusSelf();
      }
    }, [focusSelf, focusedSelf]);

    return (
      <FocusContext.Provider value={focusKey}>
        <div className={s.myKeyBoard} ref={ref}>
          <div className={s.letters}>
            {currentSymbols?.map((item, index) => (
              <Button
                variant="dark"
                className={s.button}
                key={index}
                focusedClassName={s.focused}
                onPress={() => {
                  if (typeof item !== "string") {
                    if (item.name === "CapsLock") {
                      handleCapsLock();
                    } else if (item.name === "Delete") {
                      handlePress("del");
                    }
                    return;
                  }
                  handlePress(item);
                }}
              >
                {typeof item === "string" ? (
                  toCase(item, upperCase ? "upper" : "lower")
                ) : (
                  <item.symbol
                    fill={
                      item.name === "CapsLock" && upperCase
                        ? "#fff"
                        : "transparent"
                    }
                    stroke={
                      item.name === "CapsLock" && upperCase ? "#fff" : "#000"
                    }
                  />
                )}
              </Button>
            ))}
          </div>
          <div className={s.functionality}>
            <Button
              variant="dark"
              className={cn(s.button, s.letterToNumber)}
              focusedClassName={s.focused}
              onPress={() =>
                setType((prev) => (prev === "letters" ? "number" : "letters"))
              }
            >
              {type === "letters" ? "123?" : "abc"}
            </Button>
            <Button
              variant="dark"
              className={cn(s.button, s.prev)}
              focusedClassName={s.focused}
              onPress={() => console.log("prev clicked")}
            >
              <IconCaretLeftFilled className={s.prevIcon} />
            </Button>
            <Button
              variant="dark"
              className={cn(s.button, s.next)}
              focusedClassName={cn(s.focused, s.focusSvgFill)}
              onPress={() => console.log("next clicked")}
            >
              <IconCaretRightFilled className={s.nextIcon} />
            </Button>
            <Button
              variant="dark"
              className={cn(s.button, s.space)}
              focusedClassName={s.focused}
              onPress={() => handlePress(` `)}
            >
              <IconSpace className={s.spaceIcon} />
            </Button>
            <Button
              variant="dark"
              className={s.button}
              focusedClassName={s.focused}
              onPress={() => handlePress("-")}
            >
              -
            </Button>
            <Button
              variant="dark"
              className={s.button}
              focusedClassName={s.focused}
              onPress={() => handlePress("_")}
            >
              _
            </Button>
            <Button
              variant="dark"
              className={cn(s.button, s.enter)}
              focusedClassName={s.focused}
              onPress={handleEnter}
            >
              <IconArrowNarrowRight className={s.enterIcon} />
            </Button>
          </div>
        </div>
      </FocusContext.Provider>
    );
  }
);

type KeyBoardProps = {
  onEnterPressed?: (entered: boolean) => void;
  focusedSelf?: boolean;
} & Focusable<{ letter: string }, object>;

export default MyKeyBoard;