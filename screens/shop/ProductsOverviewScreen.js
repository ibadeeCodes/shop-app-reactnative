import React, { useState, useCallback, useEffect } from "react"
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"

import ProductItem from "../../components/shop/ProductItem"
import * as CartActions from "../../store/actions/CartActions"
import * as productsActions from "../../store/actions/ProductActions"
import Colors from "../../constants/Colors"

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.availableProducts)

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      dispatch(productsActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts)

    return () => {
      unsubscribe()
    }
  }, [loadProducts])

  useEffect(() => {
    loadProducts().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadProducts])

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    })
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title)
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(CartActions.addToCart(itemData.item))
            }}
          />
        </ProductItem>
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
})

export default ProductsOverviewScreen
