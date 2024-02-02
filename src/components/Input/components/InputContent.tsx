import { DetailedHTMLProps, FC, memo } from "react";
import s from "../input.module.scss";

import cn from "classnames";


type InputProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  password?: boolean;
  label: string;
  placeholder: string;
  error?: boolean;
};

const InputContent: FC<InputProps> = memo(
  ({ error = false, placeholder, ...props }) => {
    return (
      <div
        className={cn(s.inputContent, error ? s.error : null, props.className)}
        {...props}
      >
        <span className={s.placeholder}>{placeholder}</span>
      </div>
    );
  }
);

export default InputContent;
