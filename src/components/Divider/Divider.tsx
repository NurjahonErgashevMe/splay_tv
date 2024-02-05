import s from "./divider.module.scss";

import cn from "classnames";

const DividerWithText: React.FC<IProps> = ({ text, className }) => {
  return (
    <div className={cn(s.divider, className)}>
      <hr />
      <span className={s.text}>{text}</span>
      <hr />
    </div>
  );
};

interface IProps {
  text: string;
  className?: string;
}

export default DividerWithText;
