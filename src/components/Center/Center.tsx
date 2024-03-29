import styled from "@emotion/styled";
import { CSSProperties, HTMLProps } from "react";

interface CenterProps extends HTMLProps<HTMLDivElement> {
  justifyContent?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignContent"];
  flexDirection?: CSSProperties["flexDirection"];
  gap?: string;
  width?: string | number;
}

export const Center = styled.div<CenterProps>`
  display: flex;
  width: ${(props) => props.width || "auto"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.flexDirection || "column"};
  height: 100%;
  gap: ${(props) => props.gap || 0};
`;
