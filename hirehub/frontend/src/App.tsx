import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/landingPage'
import { SignInPage } from './pages/signInPage'
import HomePage from './pages/homePage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App