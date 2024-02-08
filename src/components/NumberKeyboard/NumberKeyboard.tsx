import { FC, useCallback, useEffect } from "react";

import s from "./numberKeyboard.module.scss";

import { onlyNumbers } from "@/shared/onlyNumbers";

import { Button } from "../Button/Button";
import { IconBackspace } from "@tabler/icons-react";
import cn from "classnames";
import {
  FocusContext,
  useFocusable,
  setFocus,
  UseFocusableConfig,
  EnterPressHandler,
} from "@noriginmedia/norigin-spatial-navigation";

const NumberKeyboard: FC<NumberKeyboardProps> = ({
  onDeletePress,
  className,
  focusedSelf,
  onFocus,
  onEnterPress,
  isFocusBoundary,
  focusBoundaryDirections,
}) => {
  const { focusKey, focusSelf, ref } = useFocusable({
    onFocus,
    isFocusBoundary,
    focusBoundaryDirections,
    onArrowPress: (arrow) => {
      if (arrow === "left") {
        console.log(arrow);
        setFocus("PREVIOUS_COMPONENT_FOCUS_KEY");
      }
      return true;
    },
    focusKey: "NUMBER_KEYBOARD_FOCUS_KEY",
  });

  const handlePress = useCallback(
    (number: number) => {
      onEnterPress?.({ number }, { pressedKeys: {} });
    },
    [onEnterPress]
  );

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, [focusSelf, focusedSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={cn(s.numberKeyboard, className)} ref={ref}>
        {onlyNumbers?.map((item) => (
          <Button
            variant="dark"
            focusedVariant="white"
            key={item}
            onEnterPress={() => handlePress(item)}
            className={s.button}
            focusedClassName={s.focusedButton}
          >
            {item}
          </Button>
        ))}
        <Button
          variant="dark"
          focusedVariant="white"
          onEnterPress={() => onDeletePress?.({}, { pressedKeys: {} })}
          className={cn(s.button, s.deleteButton)}
          focusedClassName={cn(s.focusedButton, s.focusedDeleteButton)}
        >
          <IconBackspace className={s.deleteIcon} width={45} height={30} />
        </Button>
      </div>
    </FocusContext.Provider>
  );
};

type NumberKeyboardProps = {
  focusedSelf?: boolean;
  onDeletePress: EnterPressHandler;
  className?: string;
  focusedClassName?: string;
  isFocusBoundary?: boolean;
  focusBoundaryDirections?: Array<"up" | "left" | "right" | "down">;
} & UseFocusableConfig<{ number: number }>;

export default NumberKeyboard;
