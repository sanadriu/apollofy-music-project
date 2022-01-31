import { combineReducers } from "redux";

import entitiesReducer from './entities';

const CombinedReducers = combineReducers({
  entities: entitiesReducer,
});

export default CombinedReducers;
