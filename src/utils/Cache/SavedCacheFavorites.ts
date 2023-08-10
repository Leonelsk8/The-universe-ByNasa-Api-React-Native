import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostImage } from '../../types';

export const saveDataToCache = async (value:PostImage) => {
  try {
    const response:string = await getDataFromCache();
    const arraysFavorites:Array<object> = JSON.parse(response);

    arraysFavorites.push(value);

    const newArray = JSON.stringify(arraysFavorites);

    await AsyncStorage.setItem('favorites', newArray);
    return true;
  } catch (error) {
    return false;
  }
};

export const getDataFromCache = async () => {
  try {
    const value = await AsyncStorage.getItem('favorites');
    if (value !== null) {
      return value;
    } else {
      return 'Error';
    }
  } catch (error) {
    console.error('Error al recuperar los datos:', error);
  }
};

export const DefaultCreateCache = async ()=>{
  try {
    const arrayDefault:Array<object> = [];
    const arrayJson = JSON.stringify(arrayDefault)
    const response = await getDataFromCache();
    response==='Error' && await AsyncStorage.setItem('favorites', arrayJson);
  } catch (error) {
    console.log(error);
  }
}

export const existElementInFavorites = async (date:string) =>{
  try {
    const response:string = await getDataFromCache();
    if(response !== 'Error'){
      const array = JSON.parse(response);
      if(array.length > 0){
        const exist = array.filter((element:PostImage)=>{
          return element.date === date
        })
        if(exist.length > 0){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const deletedAllFavorites = async()=>{
  try {
    const arrayDefault:Array<object> = [];
    const arrayJson = JSON.stringify(arrayDefault);
    await AsyncStorage.setItem('favorites', arrayJson);
  } catch (error) {
    console.log(error);
  }
}

export const deleteElementCache = async(date:string)=>{
  try {
    const response:string = await getDataFromCache();
    if(response !== 'Error'){
      const array:Array<object> = JSON.parse(response);
      const item:number = array.findIndex((items:PostImage)=>items.date === date);
      if (item !== -1) {
        array.splice(item, 1);
        const newArray = JSON.stringify(array);
        await AsyncStorage.setItem('favorites', newArray);
      }
    }
  }catch (error) {
    console.log(error)
  }
}
