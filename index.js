import { Home } from "./componets/Home.js";
import { Welcome } from "./componets/Welcome.js";

const root = document.getElementById('root');
const routes = {
  "/": Welcome,
  "/home": Home,
};

export const onNavigate = (pathname) => {
    window.history.pushState(
      {},
      pathname,
      window.location.origin + pathname,
    );
    root.removeChild(root.firstChild);
    root.appendChild(routes[pathname](onNavigate));
  };
  
  const component = routes[window.location.pathname];
  
  window.onpopstate = () => {
    root.removeChild(root.firstChild);
    root.append(component(onNavigate));
  };
  
  root.appendChild(component(onNavigate));

// Modal
if(document.getElementById("buttonModal")) {

  let modal = document.getElementById("myModal");
  let link = document.getElementById("myModal");
  let span = document.getElementById("myModal");
}