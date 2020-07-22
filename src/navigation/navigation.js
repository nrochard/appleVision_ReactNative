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
import { StyleSheet, Image } from 'react-native';

const SearchStackNavigator = createStackNavigator({
    // HomeScreen:{
    //     screen: HomeScreen,
    //     navigationOptions:{
    //         title: 'Home'
    //     }
    // },
    CameraScreen: {
        screen: CameraScreen,
        navigationOptions: {
        title: 'Camera'
        }
    },
    showPicture: {
        screen: showPicture,
        navigationOptions: {
        title: 'Picture'
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
      }
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
          activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
          inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
          showLabel: false, // On masque les titres
          showIcon: true, // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
      }
  )

  const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  })

// export default createAppContainer(SearchStackNavigator)
export default createAppContainer(AppleTabNavigator)