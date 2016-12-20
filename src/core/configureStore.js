import {createStore, applyMiddleware, compose} from "redux"
import reduxThunk from "redux-thunk"
import reduxPromiseMiddleware from "redux-promise-middleware"
import rootReducer from "../reducers"

import {IS_DEV, IS_CLIENT} from "../constants/util"

export default initialState => {
  const middleware = applyMiddleware(
    reduxPromiseMiddleware(),
    reduxThunk
  )

  const enhancer = (IS_CLIENT && IS_DEV) ? compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) : middleware

  const store = createStore(rootReducer, initialState, enhancer)

  if (IS_DEV && module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(rootReducer)
    )
  }

  return store
}