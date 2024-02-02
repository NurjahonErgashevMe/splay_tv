import { FC } from "react";
import { To, useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import s from "./goToPrevious.module.scss";

import ArrowLeftIcon from "public/assets/icons/Arrow-left.svg";

import cn from "classnames";
import { Button } from "../Button/Button";
import {
  FocusHandler,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

interface GoToPreviousProps {
  className?: string;
  onFocus?: FocusHandler<unknown>;
  previous: To;
}

const GoToPrevious: FC<GoToPreviousProps> = ({
  className,
  onFocus,
  previous,
}) => {
  const navigate = useNavigate();

  const navigateToPrevious = () => navigate(previous ?? -1);

  const { ref, focused } = useFocusable({
    onEnterPress: navigateToPrevious,
    onEnterRelease: navigateToPrevious,
    onArrowPress: () => true,
    onFocus,
  });

  return (
    <div className={cn(s.previous, className)}>
      <Button
        variant="dark"
        className={cn(s.button, focused ? s.focused : null)}
        ref={ref}
      >
        <SVG
          src={ArrowLeftIcon}
          stroke={focused ? "#000" : "#fff"}
          width={24}
          height={24}
        ></SVG>
      </Button>
    </div>
  );
};

export default GoToPrevious;
