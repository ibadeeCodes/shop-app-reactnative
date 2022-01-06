import { View, Text, FlatList, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"

import ProductItem from "../../components/shop/ProductItem"
import * as CartActions from "../../store/actions/CartActions"
import Colors from "../../constants/Colors"

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.availableProducts)

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    })
  }

  return (
    <FlatList
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

export default ProductsOverviewScreen
