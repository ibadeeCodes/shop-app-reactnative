import React, { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import "react-native-gesture-handler"
import ShopNavigator from "./navigation/ShopNavigator"
import ProductReducer from "./store/reducers/ProductReducer"
import CartReducer from "./store/reducers/CartReducers"

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
})

const store = createStore(rootReducer)

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
      <ShopNavigator />
    </Provider>
  )
}
