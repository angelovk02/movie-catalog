import { Routes, Route } from "react-router-dom"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Logout from "./components/Logout/Logout"
import CreateMovie from "./components/Movie/CreateMovie/CreateMovie"
import MovieCatalog from "./components/Movie/MovieCatalog/MovieCatalog"
import MovieDetails from "./components/Movie/MovieDetails/MovieDetails"

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
            <Route path="/movies" element={<MovieCatalog />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/create-movie" element={<CreateMovie />} />
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
