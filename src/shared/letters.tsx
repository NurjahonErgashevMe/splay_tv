import {
  IconArrowBigUp,
  IconBackspace,
  TablerIconsProps,
} from "@tabler/icons-react";

export type TLetter =
  | string
  | { symbol: (props: TablerIconsProps) => JSX.Element; name: string };

const letters: TLetter[] = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "@",
  {
    name: "CapsLock",
    symbol: (props) => <IconArrowBigUp {...props} />,
  },
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ".",
  {
    name: "Delete",
    symbol: (props) => <IconBackspace {...props} />,
  },
];

export { letters };
