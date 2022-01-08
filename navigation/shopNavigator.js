import * as React from "react"
import { TouchableOpacity } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen"
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen"
import CartScreen from "../screens/shop/CartScreen"
import OrderScreen from "../screens/shop/OrderScreen"
import UserProductsScreen from "../screens/user/UserProductsScreen"
import EditProductScreen from "../screens/user/EditProductScreen"
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
}

const ProductsNavigator = createNativeStackNavigator()
const OrdersNavigator = createNativeStackNavigator()
const AdminNavigator = createNativeStackNavigator()
const ShopDrawerNavigator = createDrawerNavigator()

const ProductsNavigatorWrapper = () => {
  return (
    // <NavigationContainer>
    <ProductsNavigator.Navigator screenOptions={defaultHeaderOptions}>
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          title: "Shop",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.push("Cart")}>
              <Ionicons name={"cart-outline"} size={23} color={"#fff"} />
            </TouchableOpacity>
          ),
        })}
      />
      <ProductsNavigator.Screen
        name="ProductDetail"
        component={ProductDetailsScreen}
        options={({ route }) => ({ title: route.params.productTitle })}
      />
      <ProductsNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
    </ProductsNavigator.Navigator>
    // </NavigationContainer>
  )
}

const OrdersNavigatorWrapper = () => {
  return (
    // <NavigationContainer>
    <OrdersNavigator.Navigator screenOptions={defaultHeaderOptions}>
      <OrdersNavigator.Screen name="MyOrders" component={OrderScreen} />
    </OrdersNavigator.Navigator>
    // </NavigationContainer>
  )
}

const AdminNavigatorWrapper = () => {
  return (
    <AdminNavigator.Navigator screenOptions={defaultHeaderOptions}>
      <AdminNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
      />
      <AdminNavigator.Screen name="EditProduct" component={EditProductScreen} />
    </AdminNavigator.Navigator>
  )
}

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ShopDrawerNavigator.Navigator initialRouteName="Products">
        <ShopDrawerNavigator.Screen
          name="Products"
          component={ProductsNavigatorWrapper}
        />
        <ShopDrawerNavigator.Screen
          name="Orders"
          component={OrdersNavigatorWrapper}
        />
        <ShopDrawerNavigator.Screen
          name="Admin"
          component={AdminNavigatorWrapper}
        />
      </ShopDrawerNavigator.Navigator>
    </NavigationContainer>
  )
}

export default ShopNavigator
