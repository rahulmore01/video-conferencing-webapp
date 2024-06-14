import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/Room";
// import { routes } from "./routes/routes";
const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  // dynamic routing as per room id
  { path: "/room/:roomno", element: <RoomPage /> },
]);

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
