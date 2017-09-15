import { applyMiddleware, createStore } from 'redux'

import { createLogger } from 'redux-logger'
import Thunk from 'redux-thunk'
import Promise from 'redux-promise-middleware'

import reducer from './reducers'

const middleware = applyMiddleware(Promise(), Thunk, createLogger())

export default createStore(reducer, middleware);