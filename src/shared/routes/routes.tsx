/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

const GuestPage = lazy(() => import("pages/Guest/Guest"));
const SignInWithQrCode = lazy(
  () => import("pages/SigninWithQRCode/SigninWithQrCode")
);

export const routes = createBrowserRouter([
  {
    path: "/",
    loader: () => <h2>LOADING...</h2>,
    element: (
      <Suspense>
        <Outlet></Outlet>
      </Suspense>
    ),
    children: [
      {
        path: "guest",
        element: <GuestPage />,
        index: true,
      },
      {
        path: "signin-with-qrcode",
        element: <SignInWithQrCode />,
      },
    ],
  },
]);
