import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { AuthRoute } from "./components/Routes/Routes";
import MainPage from "./components/MainPage/MainPage";
import AuthForm from "./components/AuthForm/AuthForm";
import NavBar from "./components/NavBar/NavBar";

const Layout = () => {
  return(
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
const router = createBrowserRouter([
  {element: <Layout />, children: [
    {path: '/', element: <AuthRoute component={MainPage} />},
    {path: 'login', element: <AuthRoute component={AuthForm} />},
    {path: 'signup', element: <AuthRoute component={AuthForm} />},
  ]}
])


const App = () => {
  return(<RouterProvider router={router}/>)
}

export default App;
