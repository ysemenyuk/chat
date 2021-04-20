import { useContext } from 'react';

import UserContext from '../context/UserContext.js';

const useAuth = () => useContext(UserContext);

export default useAuth;
