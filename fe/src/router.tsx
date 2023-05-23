import { createHashRouter } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Personal from "./pages/Personal"
const router = createHashRouter([
    {
        path: "",
        element: <Home/>,
    },
    {
        path: "/Login",
        element: <Login/>,
    },
    {
        path: "/Register",
        element: <Register/>,
    },
    {
        path: "/Personal",
        element: <Personal/>,
    }
])
export default router