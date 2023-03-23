import React from 'react'
import Navbar from '../../components/layout/Navbar'
import AllUsers from './AllUsers';

const AdminHome = () => {
  return (
		<div className='min-h-screen bg-dark p-4 space-y-4'>
			<Navbar></Navbar>
			<div className='h-full container mx-auto grid grid-cols-12 gap-4 text-white'>
				<div className='h-full col-span-12 bg-white rounded-lg'>
                    <AllUsers />
                </div>
			</div>
		</div>
  );
}

export default AdminHome