import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../navbar"
import Footer from "../footer"

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}

export default RootLayout