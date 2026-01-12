import "./App.css";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import LoginForm from "./features/auth/components/login/LoginForm";
import Signup from "./features/auth/components/signup/SignupForm";
import Layout from "./features/sheard/componats/layout/Layout";
import FooterOnlyLayout from "./features/sheard/componats/layout/FooterOnlyLayout";
import GamesPage from "./features/games/pages/Games";
import Wallet from "./features/wallet/Wallet";
import Profile from "./features/profile/Profile";
import GoogleCallback from "./features/auth/components/GoogleCallback";
import SubCategories from "./features/home/pages/SubCategories";
import MyOrders from "./features/orders/pages/MyOrders";
import OrderDetails from "./features/orders/pages/OrderDetails";
import Dashboard from "./features/dashboard/pages/dashboard";
import UserStatistics from "./features/profile/pages/UserStatistics";
import MarketingPopup from "./features/home/componats/popup/MarketingPopup";
import MyListings from "./features/marketplace/pages/MyListings";
import MyPurchases from "./features/marketplace/pages/MyPurchases";
import ResetPassword from "./features/auth/pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // تغيير اتجاه الصفحة بناءً على اللغة
    document.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return (
    <AuthProvider>
      <MarketingPopup />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/games"
          element={
            <Layout>
              <GamesPage />
            </Layout>
          }
        />
        <Route path="/category/:id" element={<SubCategories />} />
        <Route
          path="/wallet"
          element={
            <Layout>
              <Wallet />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <LoginForm />
            </>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/google-callback" element={<GoogleCallback />} />{" "}
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="/my-orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />
        <Route
          path="/my-orders/:id"
          element={
            <Layout>
              <OrderDetails />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/profile/statistics"
          element={
            <Layout>
              <UserStatistics />
            </Layout>
          }
        />
        <Route
          path="/my-listings"
          element={
            <Layout>
              <MyListings />
            </Layout>
          }
        />
        <Route
          path="/my-purchases"
          element={
            <Layout>
              <MyPurchases />
            </Layout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
