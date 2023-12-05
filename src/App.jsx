import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import app from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import UserLinksPage from './components/userPage';
import UserBrowser from './components/UserBrowser';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  return (
    <Router className = 'bg-slate-200'>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Home />} />
        <Route path="/users/:userId" element={<UserLinksPage />} />
        <Route path="/linkbrowser" element={<UserBrowser />} />
      </Routes>
    </Router>
  );
}

export default App;