import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/landingPage'
import { SignInPage } from './pages/signInPage'
import HomePage from './pages/homePage'
import { ProfilePage } from './pages/profilePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App