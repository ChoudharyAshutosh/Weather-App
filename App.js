import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Platform,SafeAreaView , KeyboardAvoidingView, ImageBackground, ActivityIndicator } from 'react-native';
import SearchInput from './components/SearchInput'
import getImageForWeather from './utils/getImageForWeather'
import { fetchLocationId, fetchWeather } from './utils/api';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [weather,setWeather]=useState("");
  useEffect(()=>{
    (async()=>{var locationId=await fetchLocationId('San Francisco')
    setWeather(await fetchWeather(locationId))})()
  },[])
  const renderData=(weatherData)=>{
    if(weatherData.operationState!=='Searching' && weather.operationState!=='Not Found')
      return(
        <View style={styles.detailContanier}>
            <Text style={[styles.largeText, styles.text]}>{weather.location}</Text>
            <Text style={[styles.smallText, styles.text]}>{weather.weather}</Text>
            <Text style={[styles.largeText, styles.text]}>{parseFloat(weather.temperature).toFixed(2)}°</Text>
            <SearchInput placeholder="Search any city" setWeather={setWeather} prevData={weather}></SearchInput>
          </View>
      )
      else if(weather.operationState==='Not Found')
      return(
        <View style={styles.detailContanier}>
          <Text style={[styles.mediumText, styles.text]}>Clold not load weather, please try a different city.</Text>
            <SearchInput placeholder="Search any city" setWeather={setWeather} prevData={weather}></SearchInput>
        </View>
      )
    else 
      return(
        <View style={styles.detailContanier}>
          <ActivityIndicator animating={true} color="white" size="large"></ActivityIndicator>
        </View>
      )
  }
  const renderWindow=(weather)=>{
    if(weather!=="")
      return(
        <ImageBackground source={getImageForWeather(weather.weather)} style={styles.imageContainer} imageStyle={styles.image}>
          {renderData(weather)}
        </ImageBackground>
      )  
    else
    return(
      <View style={styles.detailContanier}>
        <ActivityIndicator animating={true} color="blue" size="large"></ActivityIndicator>
      </View>
    )
  }
  return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        {
          renderWindow(weather)
        }
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  detailContanier:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.2)",
    paddingHorizontal:20
  },
  text:{
    textAlign:'center',
    color:'white',
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular' : 'Roboto',
  },
  imageContainer:{
    flex:1
  },
  image:{
    flex:1,
    resizeMode:'cover',
    height:null,
    width:null
  },
  largeText:{fontSize:44},
  smallText:{fontSize:18},
  mediumText:{fontSize:26}
});
