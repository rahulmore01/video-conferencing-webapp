import { createBrowserRouter } from "react-router-dom";
import UserLobby from "../pages/UserLobby";
export const routes = createBrowserRouter([
  { path: "/", element: (<UserLobby /> )},
]);
