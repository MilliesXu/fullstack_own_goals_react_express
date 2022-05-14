import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={ <Dashboard /> }/>
            <Route path="/login" element={ <LoginPage /> } />
            <Route path="/register" element={ <RegisterPage /> } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
