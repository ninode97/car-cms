import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const getRouteElement = (element: JSX.Element, isLoggedIn: boolean) => {
  return isLoggedIn ? element : <Login />;
};
const routes = (isLoggedIn: boolean) => [
  {
    path: "/",
    element: getRouteElement(<Dashboard />, isLoggedIn),
  },
  // {
  //   path: '/app',
  //   element: isLoggedIn ? <></> : <Navigate to="/login" />,
  //   children: [
  //     { path: '/dashboard', element: <Dashboard /> },
  //     { path: '/account', element: <Account /> },
  //     { path: '/', element: <Navigate to="/app/dashboard" /> },
  //     {
  //       path: 'member',
  //       element: <Outlet />,
  //       children: [
  //         { path: '/', element: <MemberGrid /> },
  //         { path: '/add', element: <AddMember /> },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/',
  //   element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
  //   children: [
  //     { path: 'login', element: <Login /> },
  //     { path: '/', element: <Navigate to="/login" /> },
  //   ],
  // },
];

export default routes;
