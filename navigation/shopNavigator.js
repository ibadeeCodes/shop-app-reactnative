import React from "react"
import { TouchableOpacity, Button, SafeAreaView, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from "react-redux"

import AuthScreen from "../screens/user/AuthScreen"
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen"
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen"
import CartScreen from "../screens/shop/CartScreen"
import OrderScreen from "../screens/shop/OrderScreen"
import UserProductsScreen from "../screens/user/UserProductsScreen"
import EditProductScreen from "../screens/user/EditProductScreen"
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import * as authActions from "../store/actions/AuthActions"

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
const AuthNavigator = createNativeStackNavigator()
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
        })}
      />
    </AdminNavigator.Navigator>
  )
}

export const AuthNavigatorWrapper = () => {
  return (
    <AuthNavigator.Navigator screenOptions={defaultHeaderOptions}>
      {/* <AuthNavigator.Screen name="Startup" component={StartupScreen} /> */}
      <AuthNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={({ navigation }) => ({
          title: "Auth",
        })}
      />
    </AuthNavigator.Navigator>
  )
}

export const ShopNavigator = () => {
  const dispatch = useDispatch()
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                style={{ marginHorizontal: 20 }}
                onPress={() => {
                  dispatch(authActions.logout())
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        )
      }}
      initialRouteName="Startup"
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
  )
}
