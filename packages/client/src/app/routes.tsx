import { Navigate, Outlet } from "react-router-dom";
import AddCar from "../pages/cars/AddCar";
import CarGrid from "../pages/cars/CarGrid";
import InspectCar from "../pages/cars/InspectCar";
import Dashboard from "../pages/Dashboard";
import HistoryFeed from "../pages/feed/HistoryFeed";
import Login from "../pages/Login";
import UserGrid from "../pages/users/UserGrid";

const getRouteElement = (element: JSX.Element, isLoggedIn: boolean) => {
  return isLoggedIn ? element : <Login />;
};
const routes = (isLoggedIn: boolean) => [
  {
    path: "/",
    element: getRouteElement(<Dashboard />, isLoggedIn),
  },
  {
    path: "/cars",
    element: getRouteElement(<CarGrid />, isLoggedIn),
  },
  {
    path: "/cars/add",
    element: getRouteElement(<AddCar />, isLoggedIn),
  },
  {
    path: "/cars/:carId",
    element: getRouteElement(<InspectCar />, isLoggedIn),
  },
  {
    path: "/feed",
    element: getRouteElement(<HistoryFeed />, isLoggedIn),
  },
  {
    path: "/users",
    element: getRouteElement(<UserGrid />, isLoggedIn),
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
