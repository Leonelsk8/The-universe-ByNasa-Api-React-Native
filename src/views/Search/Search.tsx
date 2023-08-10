import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CalendarSelect from '../../components/CalendarSelect';
import {parse} from 'date-fns';
import fetchApi from '../../utils/API/Api';
import { PostImage} from '../../types';
import ResultSearch from '../../components/ResultSearch';

const Search = ()=>{
  const [selectedDate, setSelectedDate] = useState('----/--/--');
  const dateNow = new Date();
  const [disabledButton , setDisabledButton] = useState(true);
  const [result, setResult]= useState<PostImage>();
  

  useEffect(()=>{
    if(selectedDate!==''){
      const date = parse(selectedDate, 'yyyy-MM-dd', new Date());
      date <= dateNow ? setDisabledButton(false) : setDisabledButton(true);
    }
  },[selectedDate]);

  const search = async()=>{
    try {
      const postSearch = await fetchApi(`&date=${selectedDate}`);
      setResult(postSearch);
    } catch (error) {
      console.error(error)
      setResult(undefined);
    }
  }

  
  
  return (
    <View style={styles.container}>
      <View style={{marginTop:16}}>
        <Text style={styles.title}>Buscar imagen por fecha</Text>
      </View>
      <CalendarSelect selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <View style={styles.selectedSearchContent}>
        <Text>Fecha seleccionanda: {
          disabledButton && selectedDate!=='----/--/--' ? 'No puedes seleccionar a futuro' : selectedDate
          }
        </Text>
        <TouchableOpacity 
          disabled={disabledButton} 
          style={[
            styles.buttonsearch, 
            disabledButton ? {backgroundColor: 'gray'} : {backgroundColor: '#4464b3'}
          ]}
          onPress={search}
        >
          <Text style={{color: '#fff'}}>Buscar</Text>
        </TouchableOpacity>
      </View>
      {
        result&&(
          <ResultSearch {...result}/>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: 16
  },
  title:{
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:20
  },
  selectedSearchContent:{
    marginTop:16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonsearch:{
    padding: 10,
    borderRadius: 10
  }
});

export default Search;