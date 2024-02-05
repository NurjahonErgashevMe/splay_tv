import { FC, HTMLProps } from "react";
import s from "../input.module.scss";
import EyeCloseIcon from "public/assets/icons/Eye-close.svg";

import SVG from "react-inlinesvg";

import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { IconEye } from "@tabler/icons-react";
import { Center } from "@/components/Center/Center";

interface PasswordIconProps extends HTMLProps<HTMLDivElement> {
  type: "text" | "password";
  setType: (type: "text" | "password") => void;
}
const PasswordIcon: FC<PasswordIconProps> = ({ setType, type, ...props }) => {
  const { focused, ref, focusKey } = useFocusable({
    extraProps: { component: "password" },
    onEnterPress: () => {
      setType(type === "password" ? "text" : "password");
    },
  });

  const color = !focused ? `gray` : `#fff`;

  return (
    <FocusContext.Provider value={focusKey}>
      <div className={s.eyeIcon} ref={ref} {...props}>
        <Center height={"100%"}>
          {type === "password" ? (
            <SVG src={EyeCloseIcon} width={30} height={30} stroke={color} />
          ) : (
            <IconEye width={35} height={35} color={color} />
          )}
        </Center>
      </div>
    </FocusContext.Provider>
  );
};

export default PasswordIcon;
