import { Location, To } from "react-router-dom";

type LinkButtonExtraProps = {
  clicked: boolean;
  to: To;
  current: Location;
};

export type { LinkButtonExtraProps };
