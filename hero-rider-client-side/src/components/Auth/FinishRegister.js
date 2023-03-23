import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';
import useRegisterContext from '../../hooks/useRegisterContext';
import done from '../../images/Done-rafiki.png'

const FinishRegister = () => {
    const { handleRegisterUser } = useRegisterContext();
    const navigate = useNavigate();
  return (
		<div className='h-full grid grid-cols-2'>
			<div
				className='bg-brand flex justify-center items-center p-10'
				style={{
					background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)) ,url(https://i.ibb.co/ZXv7C4w/01-Royal-Heath.png) center/cover`,
				}}
			>
				<h1 className='text-5xl text-white font-semibold'>
					You're all set to start!
				</h1>
			</div>
			<div className='bg-white p-10 flex flex-col space-y-2 text-dark'>
				<div className='flex justify-end'>
					<Link to='/register/photos'>
						<button
							className={`text-brand1 font-semibold px-5 py-2 rounded-3xl`}
						>
							Go Back
						</button>
					</Link>
				</div>
				{/* content */}
				<div className='p-4 space-y-4 border rounded-lg flex justify-center items-center'>
					<img
						className='w-[450px] h-[450px]'
						src={done}
						alt='done'
					/>
				</div>
				{/* host footer */}
				<div className='w-full border-t border-para py-4 flex space-x-2'>
					<button
						onClick={() => handleRegisterUser(navigate)}
						className={`bg-brand1 text-white w-full font-semibold px-5 py-2 rounded-3xl`}
						disabled={false}
					>
						Finish
					</button>
				</div>
			</div>
		</div>
  );
}

export default FinishRegister