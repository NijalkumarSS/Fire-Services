import React from 'react'
import NavbarComponent from './Navbar'
import HeroSection from './Herosection'
import Features from './Features'
import Footer from './Footer'

import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <>
    <NavbarComponent />
        <HeroSection />
        <Features />
        <Footer />
    </>
  )
}

export default Home