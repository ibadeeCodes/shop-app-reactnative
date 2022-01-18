import React, { useState, useEffect } from "react"
import {
  FlatList,
  Text,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import * as ordersActions from "../../store/actions/OrderActions"
// import { HeaderButtons, Item } from "react-navigation-header-buttons"

// import HeaderButton from "../../components/UI/HeaderButton"
import OrderItem from "../../components/shop/OrderItem"
import Colors from "../../constants/Colors"

const OrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const orders = useSelector((state) => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false)
    })
  }, [dispatch])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No order found, maybe start ordering some products?</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
export default OrderScreen
