// import logo from './logo.svg';
import './App.css';
import {
  Route, Routes,
} from 'react-router-dom';
import HomePageScreen from './components/HomePage';
import LandingPage from './components/LandingPage';
import ListingInfoPage from './ListingInfoPage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/map' element={<HomePageScreen />} />
        <Route path='/listingInfo/:listingID' element={<ListingInfoPage />} />
      </Routes>
    </>
  );
}

export default App;
