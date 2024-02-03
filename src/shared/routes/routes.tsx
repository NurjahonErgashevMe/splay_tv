/* eslint-disable react-refresh/only-export-components */
import {
  Suspense,
  lazy,
  createRef,
  RefObject,
  useState,
  useEffect,
} from "react";
import {
  RouteObject,
  createBrowserRouter,
  useLocation,
  useOutlet,
} from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const GuestPage = lazy(() => import("pages/Guest/Guest"));
const AuthPage = lazy(() => import("pages/Auth/Auth"));
const ScreenPage = lazy(() => import("pages/Screen/Screen"));

const SignInWithQrCode = lazy(
  () => import("pages/SigninWithQRCode/SigninWithQrCode")
);

const routes: Array<RouteObject & { nodeRef: RefObject<HTMLDivElement> }> = [
  {
    path: "guest",
    element: <GuestPage />,
    index: true,
    nodeRef: createRef(),
  },
  {
    path: "signin-with-qrcode",
    element: <SignInWithQrCode />,
    nodeRef: createRef(),
  },
  {
    path: "auth",
    element: <AuthPage />,
    nodeRef: createRef(),
  },
  {
    path: "screen/:screen",
    element: <ScreenPage />,
    nodeRef: createRef(),
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => <h2>LOADING...</h2>,
    element: (
      <Suspense>
        <Layout />
      </Suspense>
    ),
    children: routes,
  },
]);

TopBarProgress.config({
  barColors: {
    "0": "#ff4b00",
    "1.0": "#f99e17",
  },
  shadowBlur: 5,
});

function Layout() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");

  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);
  return (
    <>
      {progress && <TopBarProgress />}
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          {() => (
            <div ref={nodeRef} className="page">
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
