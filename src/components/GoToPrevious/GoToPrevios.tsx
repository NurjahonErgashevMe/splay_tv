import { FC, useEffect } from "react";
import { To, useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import s from "./goToPrevious.module.scss";

import ArrowLeftIcon from "public/assets/icons/Arrow-left.svg";

import cn from "classnames";
import {
  FocusContext,
  FocusHandler,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

interface GoToPreviousProps {
  className?: string;
  onFocus?: FocusHandler<unknown>;
  previous?: To;
  fixed?: boolean;
  focusedSelf?: boolean;
}

const GoToPrevious: FC<GoToPreviousProps> = ({
  className,
  onFocus,
  previous,
  focusedSelf = false,
  fixed = true,
}) => {
  const navigate = useNavigate();
  const navigateToPrevious = () => navigate(previous ?? (-1 as To));

  const { ref, focused, focusKey, focusSelf } = useFocusable({
    onEnterPress: navigateToPrevious,
    onEnterRelease: navigateToPrevious,
    onArrowPress: () => true,
    onFocus,
  });

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, []);

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

export default GoToPrevious;
