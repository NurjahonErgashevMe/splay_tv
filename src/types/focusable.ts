import {
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
} from "@noriginmedia/norigin-spatial-navigation";

type Focusable<OnPressProps = unknown, OnFocusProps = unknown> = {
  onPress?: (props: OnPressProps, details?: KeyPressDetails) => void;
  onFocus?: (
    layout: FocusableComponentLayout,
    props: OnFocusProps,
    details: FocusDetails
  ) => void;
  isFocusBoundary?: boolean;
  focusBoundaryDirections?: Array<"up" | "left" | "right" | "down">;
};

export type { Focusable };
