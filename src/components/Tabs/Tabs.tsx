import { FC, HTMLAttributes } from "react";

import s from "./tabs.module.scss";

import Tab, { TTab, TabProps } from "./Tab";

import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { Focusable } from "@/types/focusable";

import cn from "classnames";

const Tabs: FC<TabsProps> = ({
  tabs,
  onPress,
  childrenFocusedClassName,
  focusedClassName,
}) => {
  const { focusKey, ref, focused } = useFocusable({
    onFocus: (e) => console.log("focus", e),
  });
  console.log(focused);
  return (
    <FocusContext.Provider value={focusKey}>
      <div className={cn(s.tabs, focused ? focusedClassName : null)} ref={ref}>
        {tabs?.map((item, index) => (
          <Tab
            {...item}
            key={index}
            focusedClassName={childrenFocusedClassName}
            onPress={onPress}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
};

type TabsProps = {
  tabs: TabProps[];
  focusedClassName?: string;
  childrenFocusedClassName?: string;
  tabElementProps?: HTMLAttributes<HTMLDivElement>;
  elementProps?: HTMLAttributes<HTMLDivElement>;
} & Focusable<TTab>;

export default Tabs;
