import "react-native-gesture-handler"
import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import ReduxThunk from "redux-thunk"
import * as Notifications from "expo-notifications"

import AppNavigator from "./navigation/AppNavigator"
import ProductReducer from "./store/reducers/ProductReducer"
import CartReducer from "./store/reducers/CartReducers"
import OrderReducer from "./store/reducers/OrderReducer"
import AuthReducer from "./store/reducers/AuthReducer"

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true }
  },
})

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  orders: OrderReducer,
  auth: AuthReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  const loadFontAsync = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    })
  }

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFontAsync}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("error")}
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
