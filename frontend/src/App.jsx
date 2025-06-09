// PUNYASHREE DAS-22BCSH93
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import Searchcat from "./pages/Searchcat"
import Search from "./pages/Search"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import StoreDetails from "./pages/StoreDetails"
import {AuthProvider} from "./context/AuthContext"
import AddStore from "./pages/AddStore"
import MyStore from "./pages/MyStore"
import UpdateStore from "./pages/UpdateStore"
import AddReview from "./pages/AddReview"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home />},
        { path: "/:id", element: <StoreDetails />},
        { path: "/search", element: <Search />},
        { path: "/searchcat", element: <Searchcat />},
        { path: "/signup", element: <SignUp />},
        { path: "/signin", element: <SignIn />},
        { path: "/addstore", element: <AddStore />},
        { path: "/update/:id", element: <UpdateStore />},
        { path: "/mystore", element: <MyStore />},
        { path: "/review/:id", element: <AddReview />},
        
        
      ]
    }
  ])
  return (
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  )
}
export default App