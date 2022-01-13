import React from "react"
import { FlatList, Text, Platform } from "react-native"
import { useSelector } from "react-redux"
// import { HeaderButtons, Item } from "react-navigation-header-buttons"

// import HeaderButton from "../../components/UI/HeaderButton"
import OrderItem from "../../components/shop/OrderItem"

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders)

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

export default OrderScreen
