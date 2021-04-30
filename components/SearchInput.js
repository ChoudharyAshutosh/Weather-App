import React,{useState} from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import { fetchLocationId, fetchWeather } from '../utils/api';
export default function SearchInput (props){
    const [phrase,search]=useState("");
    const find=async(event)=>{
        var prevData=props.prevData;
        props.setWeather({weather:prevData.weather,operationState:'Searching'})
        search(event.nativeEvent.text);
        var locationId=await fetchLocationId(event.nativeEvent.text);
        if(locationId==="Not Found")
            props.setWeather({weather:prevData.weather,operationState:'Not Found'})
        props.setWeather(await fetchWeather(locationId))
    }
    return(
        <View style={styles.container}>
            <TextInput style={styles.textInput} onSubmitEditing={find.bind(this)} autoCorrect={false} placeholder={props.placeholder} placeholderTextColor="white" underlineColorAndroid="transparent" clearButtonMode="always"></TextInput>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        height:40,
        marginTop:20,
        backgroundColor:"#666",
        marginHorizontal:40,
        paddingHorizontal:10,
        borderRadius:5
    },
    textInput:{
        flex:1,
    }
})