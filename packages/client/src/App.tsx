import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./app/routes";
import { RootStoreContext } from "./app/stores/rootStore";

function App() {
  const rootStore = useContext(RootStoreContext);
  const location = useLocation();
  const routing = useRoutes(routes(rootStore.commonStore.isLoggedIn));

  useEffect(() => {
    const root = (document as any).querySelector("html");
    root.style.scrollBehavior = "auto";
    (window as any).scroll({ top: 0 });
  }, [location.pathname]); // triggered on route change

  return <>{routing}</>;
}

export default observer(App);
