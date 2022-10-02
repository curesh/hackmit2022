// import logo from './logo.svg';
import './App.css';
import {
  Route, Routes,
} from 'react-router-dom';
import HomePageScreen from './components/HomePage';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/map' element={<HomePageScreen />} />
    </Routes>
  );
}

export default App;
