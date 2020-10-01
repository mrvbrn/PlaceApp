import React from 'react';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import HeaderButton from "../components/HeaderButton";

const PlacesListScreen = props => {
  return (
    <SafeAreaView>
        <Text>PlacesListScreen</Text>
    </SafeAreaView>
  );
};

PlacesListScreen.navigationOptions = navData => {
  return{
    headerTitle: 'All Places',
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
       <Item
         title="Add Place"
         iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
         onPress={() => {navData.navigation.navigate('NewPlace')}}
       />
    </HeaderButtons>
  }
};





export default PlacesListScreen;
