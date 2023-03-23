import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegisterComponent from './pages/RegisterComponent/RegisterComponent';
import AdminHome from './dashboards/Admin/AdminHome';

function App() {
	return (
		<div className=''>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='register/*' element={<RegisterComponent />} />
				<Route path='dashboard/admin' element={<AdminHome />} />
			</Routes>
		</div>
	);
}

export default App;
