import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../redux/slices/productsSlice';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const fakeProducts = [
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' },
    ];
    dispatch(setProducts(fakeProducts));
  }, []);

  return (
    <View>
      <Text>Products List</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default ProductsScreen;
