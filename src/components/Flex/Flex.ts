import styled from "@emotion/styled";
import { CSSProperties, HTMLProps } from "react";

interface Flex extends HTMLProps<HTMLDivElement> {
  gap: string;
  flexDirection: CSSProperties["flexDirection"];
}

export const Flex = styled.div<Partial<Flex>>`
  display: flex;
  gap: ${(props) => props.gap || 0};
  flex-direction: ${(props) => props.flexDirection || "row"};
`;
