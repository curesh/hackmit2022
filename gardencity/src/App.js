// import logo from './logo.svg';
import './App.css';
import {
  Route, Routes,
} from 'react-router-dom';
import HomePageScreen from './components/HomePage';
import LandingPage from './LandingPage';
import ListingInfoPage from './ListingInfoPage';
import MapSidebar from './components/MapSidebar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/map' element={<HomePageScreen />} />
      <Route path='/listingInfo/:listingID' element={<ListingInfoPage />} />
      <Route path='/sidebarTemp' element={<MapSidebar/>} />
    </Routes>
  );
}

export default App;
