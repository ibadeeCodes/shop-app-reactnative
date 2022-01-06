import * as React from "react"
import { TouchableOpacity } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen"
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen"
import CartScreen from "../screens/shop/CartScreen"
import OrderScreen from "../screens/shop/OrderScreen"
import UserProductsScreen from "../screens/user/UserProductsScreen"
import EditProductScreen from "../screens/user/EditProductScreen"
import Colors from "../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Products"
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
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailsScreen}
          options={({ route }) => ({ title: route.params.productTitle })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Cart" }}
        />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="UserProducts" component={UserProductsScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default ShopNavigator
