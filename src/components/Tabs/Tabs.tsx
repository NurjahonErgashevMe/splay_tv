import { FC, HTMLAttributes } from "react";

import s from "./tabs.module.scss";

import Tab, { TTab, TabProps } from "./Tab";

import {
  FocusContext,
  UseFocusableConfig,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import cn from "classnames";

const Tabs: FC<TabsProps> = ({
  tabs,
  onEnterPress,
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
            onEnterPress={onEnterPress}
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
} & UseFocusableConfig<TTab>;

export default Tabs;
