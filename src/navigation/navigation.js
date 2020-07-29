// Navigation/Navigation.js
import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import CameraScreen from '../screens/cameraScreen'
import showPicture from '../screens/showPicture'
import HomeScreen from '../screens/homeScreen'
import AppleScreen from '../screens/appleScreen'
import NotAppleScreen from '../screens/notAppleScreen'
import ResultScreen from '../screens/resultScreen'
import { StyleSheet, Image } from 'react-native';

const SearchStackNavigator = createStackNavigator({
    CameraScreen: {
        screen: CameraScreen,
        navigationOptions: {
        title: 'Camera',
        headerShown: false
        }
    },
    showPicture: {
        screen: showPicture,
        navigationOptions: {
        title: 'Photo prise',
        }
    },
    ResultScreen: {
      screen: ResultScreen,
      navigationOptions: {
        title : 'Résultat',
        headerShown: false
      }
    }
})

const AppleTabNavigator = createBottomTabNavigator({
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: () => {
            return <Image
              source={require('../../assets/images/home.png')}
              style={styles.icon}/> 
          }
      },
    },
    CameraScreen: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
            return <Image
              source={require('../../assets/images/camera.png')}
              style={styles.icon}/> 
          }
      }
    },
    AppleScreen: {
        screen: AppleScreen,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                  source={require('../../assets/images/apple.png')}
                  style={styles.icon}/> 
              }
          }
      },
      NotAppleScreen: {
        screen: NotAppleScreen,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                  source={require('../../assets/images/trash.png')}
                  style={styles.icon}/> 
              }
          }
      }
    },
    {
        tabBarOptions: {
          activeBackgroundColor: '#DDDDDD',
          inactiveBackgroundColor: '#FFFFFF',
          showLabel: false, 
          showIcon: true,
        }
      }
  )

  const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  })

export default createAppContainer(AppleTabNavigator)