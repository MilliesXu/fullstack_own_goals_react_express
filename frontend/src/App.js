import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={ <Dashboard /> }/>
            <Route path="/login" element={ <LoginPage /> } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
