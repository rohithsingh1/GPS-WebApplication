import {configureStore} from '@reduxjs/toolkit';
import alertsSlice from './alertsSlice';
import gpsSlice from './gpsSlice';
import usersSlice from './usersSlice';

// configureStore accepts object as parameter
const store = configureStore({
    // we can combine multiple reducers in reducers object as key-value pair
    reducer:{
        alerts : alertsSlice,
        gps: gpsSlice,
        user:usersSlice
    },
})

export function setupStore(preloadedState) {
  return configureStore({
    reducer:{
        //alerts : alertsSlice,
        gps: gpsSlice,
        //user:usersSlice
    },
    preloadedState
  })
}


export default store