import { configureStore } from '@reduxjs/toolkit'

import reducers from './reducers';
// import logger from './middleware/logger';
// import api from './middleware/api';
// import toast from './middleware/toast';

export default function configureAppStore() {
  return configureStore({
    reducers,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      // logger({ destination: "console" }),
      // toast,
      // api
    ]
  })
}