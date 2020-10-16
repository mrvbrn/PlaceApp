import React, {useEffect} from 'react';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import PlaceItem from "../components/PlaceItem";
import HeaderButton from "../components/HeaderButton";
import * as placesActions from "../store/places-actions";


const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  },[dispatch])


  return (
    <SafeAreaView>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData => 
          <PlaceItem
            title={itemData.item.title}
            image={itemData.item.imageUri}
            address={itemData.item.address}
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
