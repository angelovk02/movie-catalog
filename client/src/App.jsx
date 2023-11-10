import { Routes, Route } from "react-router-dom"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Logout from "./components/Logout/Logout"

import { AuthProvider } from "./Contexts/AuthContext"

import styles from "./App.module.css"

function App() {


  return (

    <AuthProvider>
      <div className={styles.container}>
        <Header />

        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

          </Routes>
        </div>


        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
