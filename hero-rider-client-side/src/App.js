import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegisterComponent from './pages/RegisterComponent/RegisterComponent';
import AdminHome from './dashboards/Admin/AdminHome';
import BuyPackages from './pages/BuyPackages/BuyPackages';
import axios from 'axios';

axios.defaults.baseURL = 'https://hero-rider-server-api.onrender.com/api/v1';
axios.defaults.withCredentials = true;

function App() {
	return (
		<div className=''>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='register/*' element={<RegisterComponent />} />
				<Route path='dashboard/admin' element={<AdminHome />} />
				<Route path='buy-package' element={<BuyPackages />} />
			</Routes>
		</div>
	);
}

export default App;
