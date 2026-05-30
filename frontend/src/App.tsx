import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { InstructorDashboard } from './pages/InstructorDashboard';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Problems } from './pages/Problems';
import { SolveProblem } from './pages/SolveProblem';
import { GlobalRanking } from './pages/GlobalRanking';
import { Contests } from './pages/Contests';
import { ContestOverview } from './pages/ContestOverview';
import { ContestProblems } from './pages/ContestProblems';
import { ContestProblemSolve } from './pages/ContestProblemSolve';
import { ContestSubmissions } from './pages/ContestSubmissions';
import { ContestRanking } from './pages/ContestRanking';
import { ContestLayout } from './components/ContestLayout';
import { ShoppingCart } from './pages/ShoppingCart';
import { Withdraw } from './pages/Withdraw';
import { WalletTransaction } from './pages/WalletTransaction';
import { PaymentTransaction } from './pages/PaymentTransaction';

function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Auth routes without shared Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Platform SPA routes wrapped inside responsive Layout shell */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="instructor" element={<InstructorDashboard />} />
            
            {/* Courses Catalog & Details */}
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CourseDetail />} />
            
            {/* Coding Arena problems set */}
            <Route path="problems" element={<Problems />} />
            <Route path="problems/:id" element={<SolveProblem />} />
            
            {/* Global ranks */}
            <Route path="rankings" element={<GlobalRanking />} />
            
            {/* Competitions */}
            <Route path="contests" element={<Contests />} />
            <Route path="contests/:id" element={<ContestLayout />}>
              <Route index element={<ContestOverview />} />
              <Route path="problems" element={<ContestProblems />} />
              <Route path="problems/:problemId" element={<ContestProblemSolve />} />
              <Route path="submissions" element={<ContestSubmissions />} />
              <Route path="ranking" element={<ContestRanking />} />
            </Route>
            
            {/* Shopping cart & wallet */}
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="wallet-transaction" element={<WalletTransaction />} />
            <Route path="payment-transaction" element={<PaymentTransaction />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
