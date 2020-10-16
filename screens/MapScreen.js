import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from "../constants/Colors";

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState();
  const mapRegion={
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
  const selectLocationHandler = event => {
    setSelectedLocation({
        lat:event.nativeEvent.coordinate.latitude,
        lng:event.nativeEvent.coordinate.longitude
    })
  }

  let markerCoordinate;

  if(selectedLocation){
    markerCoordinate = {
      latitude:selectedLocation.lat,
      longitude:selectedLocation.lng
    }
  };

  const savePickedLocationHandler = useCallback(() => {
    if(!selectedLocation){
        return;
    }
    props.navigation.navigate('NewPlace', {pickedLocation:selectedLocation});
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({saveLocation:savePickedLocationHandler})
  },[savePickedLocationHandler])

  return (
    <MapView region={mapRegion} style={styles.map} onPress={selectLocationHandler}>
      <Marker title="Picked Location" coordinate={markerCoordinate}></Marker>
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveBtn = navData.navigation.getParam('saveLocation')
  return{
    headerRight:
    <TouchableOpacity style={styles.headerButton} onPress={saveBtn}>
      <Text style={styles.headerButtonText}>Save</Text>
    </TouchableOpacity>

  }
}

const styles = StyleSheet.create({
  map:{
    flex:1
  },
  headerButton:{
    marginHorizontal:20
  },
  headerButtonText:{
    fontSize:16,
    color:Platform.OS === 'android' ? 'white' : Colors.primary
  }
});

export default MapScreen;
