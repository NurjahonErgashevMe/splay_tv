import { FC, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import s from "./goToPrevious.module.scss";

import ArrowLeftIcon from "public/assets/icons/Arrow-left.svg";

import cn from "classnames";
import {
  FocusContext,
  UseFocusableConfig,
  setFocus,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

const GoToPrevious: FC<GoToPreviousProps> = ({
  className,
  onFocus,
  previous,
  focusedSelf = false,
  fixed = true,
  outChildFocusKey,
  onArrowPress,
  focusKey: PropsFocusKey,
}) => {
  const navigate = useNavigate();
  const navigateToPrevious = () => navigate(previous ?? (-1 as To));

  const { ref, focused, focusKey, focusSelf } = useFocusable({
    onEnterPress: navigateToPrevious,
    onEnterRelease: navigateToPrevious,
    onArrowPress: (arrow) => {
      if (onArrowPress) {
        return onArrowPress?.(arrow, arrow as never, { pressedKeys: {} });
      } else {
        if (arrow === "right" && outChildFocusKey) {
          setFocus(outChildFocusKey);
        }
        return true;
      }
    },
    focusKey: PropsFocusKey ?? "PREVIOUS_COMPONENT_FOCUS_KEY",
    saveLastFocusedChild: true,
    onFocus,
  });

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, [focusSelf, focusedSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={cn(
          s.previous,
          fixed ? s.fixed : null,
          focused ? s.focused : null,
          className
        )}
      >
        <button className={cn(s.button, focused ? s.focused : null)}>
          <SVG
            src={ArrowLeftIcon}
            stroke={focused ? "#000" : "#fff"}
            width={24}
            height={24}
          ></SVG>
        </button>
      </div>
    </FocusContext.Provider>
  );
};

type GoToPreviousProps = {
  className?: string;
  previous?: To;
  fixed?: boolean;
  focusedSelf?: boolean;
  outChildFocusKey?: string;
} & UseFocusableConfig;

export default GoToPrevious;
