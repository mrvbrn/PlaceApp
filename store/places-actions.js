import * as FileSystem from 'expo-file-system';
import { insertPlaces, fetchPlaces } from "../helpers/db";


export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE';

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName;

    try{
      await FileSystem.moveAsync({
        from:image,
        to:newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        'dummy data',
        12.5,
        16
      );
      console.log(dbResult)
      dispatch ({ type:ADD_PLACE, placeData : {id: dbResult.insertId, title:title, image:newPath} });
    }catch(err){
        console.log(err);
        throw err
    }  
  }
};


export const loadPlaces = () => {
  return async dispatch => {
    try{
      const dbResult = await fetchPlaces();
      console.log(dbResult)
      dispatch({ type:SET_PLACE, places:dbResult.rows._array});
    }catch(err){
      throw err
    }

  };
};