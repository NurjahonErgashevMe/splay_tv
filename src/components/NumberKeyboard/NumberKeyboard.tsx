import { FC, useCallback, useEffect } from "react";

import s from "./numberKeyboard.module.scss";

import { onlyNumbers } from "@/shared/onlyNumbers";

import { Button } from "../Button/Button";
import { IconBackspace } from "@tabler/icons-react";
import cn from "classnames";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { Focusable } from "@/types/focusable";

const NumberKeyboard: FC<NumberKeyboardProps> = ({
  onDeletePress,
  className,
  focusedSelf,
  onFocus,
  onPress,
  isFocusBoundary,
  focusBoundaryDirections,
}) => {
  const { focusKey, focusSelf, ref } = useFocusable({
    onFocus,
    isFocusBoundary,
    focusBoundaryDirections,
  });

  const handlePress = useCallback(
    (number: number) => {
      onPress?.({ number });
    },
    [onPress]
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
            onPress={() => handlePress(item)}
            className={s.button}
            focusedClassName={s.focusedButton}
          >
            {item}
          </Button>
        ))}
        <Button
          variant="dark"
          focusedVariant="white"
          onPress={() => onDeletePress?.({})}
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
  onDeletePress: Focusable["onPress"];
  className?: string;
  focusedClassName?: string;
  isFocusBoundary?: boolean;
  focusBoundaryDirections?: Array<"up" | "left" | "right" | "down">;
} & Focusable<{ number: number }>;

export default NumberKeyboard;
