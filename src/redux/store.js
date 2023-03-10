import { createStore ,compose, applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';

import rootReducer from './reducers';

const composeEnchancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnchancers(applyMiddleware (thunk))
);
export default store;
