import React, { useContext } from 'react';
import { RegisterContext } from '../contexts/RegisterProvider';

const useRegisterContext = () => {
	return useContext(RegisterContext);
};

export default useRegisterContext;
