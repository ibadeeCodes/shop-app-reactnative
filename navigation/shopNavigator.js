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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer()
              }}
            >
              <Ionicons name={"menu-outline"} size={28} color={"#fff"} />
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
  )
}

const OrdersNavigatorWrapper = () => {
  return (
    <OrdersNavigator.Navigator screenOptions={defaultHeaderOptions}>
      <OrdersNavigator.Screen
        name="MyOrders"
        component={OrderScreen}
        options={({ navigation }) => ({
          title: " Your Orders",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer()
              }}
            >
              <Ionicons name={"menu-outline"} size={28} color={"#fff"} />
            </TouchableOpacity>
          ),
        })}
      />
    </OrdersNavigator.Navigator>
  )
}

const AdminNavigatorWrapper = () => {
  return (
    <AdminNavigator.Navigator screenOptions={defaultHeaderOptions}>
      <AdminNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: "Your Products",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer()
              }}
            >
              <Ionicons name={"menu-outline"} size={28} color={"#fff"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditProduct")
              }}
            >
              <Ionicons name={"add-circle-outline"} size={28} color={"#fff"} />
            </TouchableOpacity>
          ),
        })}
      />
      <AdminNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.productId ? "Edit Product" : "Add Product",
          headerRight: () => (
            <TouchableOpacity onPress={route.params?.submit}>
              <Ionicons name={"save-outline"} size={23} color={"#fff"} />
            </TouchableOpacity>
          ),
        })}
      />
    </AdminNavigator.Navigator>
  )
}

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ShopDrawerNavigator.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: false,
        }}
      >
        <ShopDrawerNavigator.Screen
          name="Products"
          component={ProductsNavigatorWrapper}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="shirt" size={25} color={Colors.primary} />
            ),
            drawerActiveTintColor: Colors.primary,
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Orders"
          component={OrdersNavigatorWrapper}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="cube" size={25} color={Colors.primary} />
            ),

            drawerActiveTintColor: Colors.primary,
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Admin"
          component={AdminNavigatorWrapper}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="person" size={25} color={Colors.primary} />
            ),

            drawerActiveTintColor: Colors.primary,
          }}
        />
      </ShopDrawerNavigator.Navigator>
    </NavigationContainer>
  )
}

export default ShopNavigator
