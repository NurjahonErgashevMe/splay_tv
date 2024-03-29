import { FC, HTMLAttributes, useEffect } from "react";

import { To, useNavigate } from "react-router-dom";

import s from "./tabs.module.scss";

import {
  FocusContext,
  UseFocusableConfig,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";


import { Center } from "../Center/Center";

import cn from "classnames";

const Tab: FC<TabProps> = ({
  href,
  title,
  onEnterPress,
  focusedClassName,
  focusedSelf = false,
  className,
  active,
  ...props
}) => {
  const navigate = useNavigate();
  const { focusKey, focusSelf, focused, ref } = useFocusable<TTab>({
    extraProps: { href, title },
    onEnterPress: (props, details) => {
      if (!onEnterPress && href) {
        return navigate(href);
      }
      onEnterPress?.(props, details);
    },
  });

  useEffect(() => {
    if (focusedSelf) {
      focusSelf();
    }
  }, [focusSelf, focusedSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <Center
        className={cn(
          s.tab,
          focused ? s.focused : null,
          focused ? focusedClassName : null,
          active ? s.active : null,
          className
        )}
        ref={ref}
        {...props}
      >
        {title}
      </Center>
    </FocusContext.Provider>
  );
};

export type TTab = { title: string; href?: To; active?: boolean };

export type TabProps = {
  focusedClassName?: string;
  focusedSelf?: boolean;
} & UseFocusableConfig<TTab> &
  TTab &
  HTMLAttributes<HTMLDivElement>;

export default Tab;
