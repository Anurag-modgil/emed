import React from 'react'
import Navigation from '../Navigation/Navigation';
import Footer from '../footer/Footer';

const HomePageLayout = ({children}) => {
  return (
    <div>
        <div> <Navigation/></div>
        {children}
        <div> <Footer/></div>
    </div>
  )
}

export default HomePageLayout