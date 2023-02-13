import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app as firebase } from "./firebase/firebase-config";
import { Home } from "./componets/Home";
import { Welcome } from "./componets/Welcome";

const auth = getAuth(firebase);

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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.emailVerified) {
        console.log(user.email, user.uid)
        onNavigate('/home');
      } else {
        onNavigate('/');
      };
    } else {
      onNavigate('/');
    }
  });