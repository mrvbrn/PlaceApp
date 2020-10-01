export const ADD_PLACE = 'ADD_PLACE';


export const AddPlace = title => {
    return { type:ADD_PLACE, placeData : {title:title} };
};