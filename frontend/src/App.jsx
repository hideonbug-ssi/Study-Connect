import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import MyNotes from "./pages/MyNotes";
import AddNotes from "./pages/AddNotes";
import Setting from "./pages/Setting";
import EditNote from "./pages/EditNote";
import OtherNotes from "./pages/OtherNotes";
import Error from "./pages/Error";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignIn = () => {
    isAuthenticated ? setIsAuthenticated(true):setIsAuthenticated(false);
  }

  function checkAuthentication() {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    checkAuthentication();
  }, []); 

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<CreateAccountPage />} />
            <Route path="/notes/:userId" element={<MyNotes />} />
            <Route path="/add-notes/:userId" element={<AddNotes />} />
            <Route path="/edit-notes/:noteId/edit" element={<EditNote />} />
            <Route path="/shared-notes/:userId" element={<OtherNotes />} />
            <Route path="/setting/:userId" element={<Setting />} />
            <Route path="*" element={<Error />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onSignIn={handleSignIn} />} />
            <Route path="/signup" element={<CreateAccountPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
