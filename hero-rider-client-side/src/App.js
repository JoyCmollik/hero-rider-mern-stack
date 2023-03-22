import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegisterComponent from './pages/RegisterComponent/RegisterComponent';

function App() {
  return (
    <div className="">
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='register/*' element={<RegisterComponent />} />
     </Routes>
    </div>
  );
}

export default App;
