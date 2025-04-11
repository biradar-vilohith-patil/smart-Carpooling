import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import OfferSeat from './pages/OfferSeat'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'
import Error from './pages/Error'
import RideDetail from './pages/RideDetail'
import Profile from './pages/Profile'
import MapView from './components/MapView' // 🆕 Added

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/offer-seat" element={<OfferSeat />} />
        <Route path="/ride/:rideId" element={<RideDetail />} />
        <Route path="/profile" element={<Profile />} />

        {/* ✅ New Route for Testing Map */}
        <Route path="/map" element={
          <MapView 
            origin={[28.6139, 77.2090]} 
            destination={[28.4089, 77.3178]} 
            currentLocation={[28.6200, 77.2200]} 
          />
        } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
