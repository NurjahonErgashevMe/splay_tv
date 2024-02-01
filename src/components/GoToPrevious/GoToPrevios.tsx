import { FC } from "react";
import { useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";

import s from "./goToPrevious.module.scss";

import ArrowLeftIcon from "public/assets/icons/Arrow-left.svg";

import cn from "classnames";
import { Button } from "../Button/Button";

interface GoToPreviousProps {
  className?: string;
}

const GoToPrevious: FC<GoToPreviousProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div className={cn(s.previous, className)}>
      <Button
        variant="dark"
        onClick={() => navigate(-1)}
        className={s.button}
      >
        <SVG src={ArrowLeftIcon} width={24} height={24} ></SVG>
      </Button>
    </div>
  );
};

export default GoToPrevious;
