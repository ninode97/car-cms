import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./app/routes";
import { RootStoreContext } from "./app/stores/rootStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastMessage = (
  type: "info" | "success" | "warning" | "error" | "default",
  message: string
) => {
  toast(message, {
    type,
    position: "bottom-right",
  });
};

function App() {
  const rootStore = useContext(RootStoreContext);
  const location = useLocation();
  const routing = useRoutes(routes(rootStore.commonStore.isLoggedIn));

  useEffect(() => {
    const root = (document as any).querySelector("html");
    root.style.scrollBehavior = "auto";
    (window as any).scroll({ top: 0 });
  }, [location.pathname]); // triggered on route change

  return (
    <>
      {routing}
      <ToastContainer />
    </>
  );
}

export default observer(App);
