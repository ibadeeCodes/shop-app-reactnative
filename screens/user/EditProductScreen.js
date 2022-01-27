import React, { useState, useEffect, useCallback, useLayoutEffect } from "react"
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { Ionicons } from "@expo/vector-icons"

import * as productsActions from "../../store/actions/ProductActions"

const EditProductScreen = (props) => {
  const prodId = props.route.params?.productId

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )

  const dispatch = useDispatch()

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "")
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  )
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  )

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productsActions.updateProduct(prodId, title, description, imageUrl)
      )
    } else {
      dispatch(
        productsActions.createProduct(title, description, imageUrl, +price)
      )
    }
    props.navigation.goBack()
  }, [dispatch, prodId, title, description, imageUrl, price])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={submitHandler}>
            <Ionicons name={"save-outline"} size={23} color={"#fff"} />
          </TouchableOpacity>
        )
      },
    })
  }, [submitHandler])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

// EditProductScreen.navigationOptions = navData => {
//   const submitFn = navData.navigation.getParam('submit');
//   return {
//     headerTitle: navData.navigation.getParam('productId')
//       ? 'Edit Product'
//       : 'Add Product',
//     headerRight: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Save"
//           iconName={
//             Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
//           }
//           onPress={submitFn}
//         />
//       </HeaderButtons>
//     )
//   };
// };

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
})

export default EditProductScreen
