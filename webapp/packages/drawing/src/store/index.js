import { 
    createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import { setShowMoreHome } from '../views/home/homeRedux'

const sagaMiddleware = createSagaMiddleware()
const middleWare = [thunk, logger, sagaMiddleware]
const composeEnhancers =
  typeof window === 'object' &&
  /* eslint-disable-next-line */
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  /* eslint-disable-next-line */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

const store = createStore(
    combineReducers({ setShowMoreHome }),
    composeEnhancers(applyMiddleware(...middleWare))
)

sagaMiddleware.run(saga);

export default store
