import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Appbar } from './components/AppBar';
import { Signup } from './pages/landingPage';
import { SignInPage } from './pages/signInPage';
import HomePage from './pages/homePage';
import { ProfilePage } from './pages/profilePage';
import { EditProfilePage } from './pages/editProfilePage';
import CreatePostPage from './pages/createPostPage';
import { EditPostPage } from './pages/editPostPage';

function App() {
  return (
    <BrowserRouter>
      <AppWithRoutes />
    </BrowserRouter>
  );
}

function AppWithRoutes() {
  const location = useLocation();

  //exclude
  const hideAppbarPaths = ['/', '/signin'];
  const hideAppbar = hideAppbarPaths.includes(location.pathname);
  
  return (
    <>
      {/* Conditionally render Appbar */}
      {!hideAppbar && <Appbar />}
      <div className={`${!hideAppbar ? 'pt-20' : 'pt-0'}`}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/job-post" element={<CreatePostPage />} />
          <Route path="/job-post/edit/:id" element={<EditPostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
