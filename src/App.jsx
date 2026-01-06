import "./App.css";
import { Routes, Route } from 'react-router-dom';
import Home from "./features/home/pages/Home";
import LoginForm from "./features/auth/components/login/LoginForm";
import Signup from "./features/auth/components/signup/SignupForm";
import Layout from "./features/sheard/componats/layout/Layout";
import FooterOnlyLayout from "./features/sheard/componats/layout/FooterOnlyLayout";
import GamesPage from "./features/games/pages/Games";
import Wallet from "./features/wallet/Wallet";
import Profile from "./features/profile/Profile";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/games" element={<Layout><GamesPage /></Layout>} />
        <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/login" element={<FooterOnlyLayout><LoginForm /></FooterOnlyLayout>} />
        <Route path="/signup" element={<FooterOnlyLayout><Signup /></FooterOnlyLayout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
