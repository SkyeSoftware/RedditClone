import { createContext } from 'react';
import { Persistor } from 'redux-persist';

export default createContext<Persistor>(null);
