import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/slices/productsSlice';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const fakeProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
    ];
    dispatch(setProducts(fakeProducts)); // Cập nhật Redux store
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      {products.map((product) => (
        <Text key={product.id}>{product.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
