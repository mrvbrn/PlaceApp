import React from 'react';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import HeaderButton from "../components/HeaderButton";


const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places)
  return (
    <SafeAreaView>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => 
          <PlaceItem
            title={itemData.item.title}
            image={null}
            address={null}
            onSelect={() => {
              props.navigation.navigate('PlaceDetail', {
                placeTitle:itemData.item.title,
                placeid:itemData.item.id
              });
            }}
          />
        }
      />
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
