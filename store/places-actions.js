import * as FileSystem from 'expo-file-system';
import { insertPlace } from "../helpers/db";


export const ADD_PLACE = 'ADD_PLACE';

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