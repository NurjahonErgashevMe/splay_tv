import { DetailedHTMLProps, FC, memo } from "react";
import s from "../input.module.scss";

import cn from "classnames";

const InputContent: FC<InputProps> = memo(
  ({ error = false, placeholder, ...props }) => {
    return (
      <input
        placeholder={placeholder}
        className={cn(s.inputContent, error ? s.error : null, props.className)}
        {...props}
      />
    );
  }
);

type InputProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  password?: boolean;
  label: string;
  placeholder: string;
  error?: boolean;
};

export default InputContent;
