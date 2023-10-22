import React, { useContext } from "react";
import HomePage from "./pages/Home/HomePage";
import {createBrowserRouter,Navigate,RouterProvider } from "react-router-dom";
import TestPage from "./pages/TestPage/TestPage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Trading from "./pages/Trading/Trading";
import TestCssPage from "./pages/TestCssPage/TestCssPage";
import AssetsPage from "./pages/AssetsPage/AssetsPage";
import AuthContext from "./context/authContext";
import DepositePage from "./pages/DepositePage/DepositePage";
import WithdrawPage from "./pages/WithdrawPage/WithdrawPage";

const App = () => {
  const { auth } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (auth === false) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/trade",
      element: <Trading />,
    },
    {
      path: "/assets",
      element: (
        <ProtectedRoute>
          <AssetsPage />
        </ProtectedRoute>
      )
    },
    {
      path: "/test",
      element: <TestPage/>,
    },
    {
      path: "/deposite/:currency",
      element: (
        <ProtectedRoute>
          <DepositePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/withdraw/:currency",
      element: (
        <ProtectedRoute>
          <WithdrawPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/testcss",
      element: <TestCssPage/>,
    },
    {
      path: "/*",
      element: <HomePage/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
    
  
}

export default App;
