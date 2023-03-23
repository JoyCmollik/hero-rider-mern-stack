import React, { createContext } from 'react';
import useRegister from '../hooks/useRegister';

export const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
	const allContexts = useRegister();

	return (
		<RegisterContext.Provider value={allContexts}>
			{children}
		</RegisterContext.Provider>
	);
};

export default RegisterProvider;
