import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default class ProfileImageEdit extends React.Component {
    render() {
        let picturePath = this.props.navigation.state.params.photo;
        console.log(picturePath);
        return (
                <View style={styles.container}>
                <Image source={{uri:picturePath}} style={{width: 400, height: 500}} />
                <View style={styles.containerButton}>
                    <TouchableOpacity 
                    style={styles.button}>
                      <Text style={styles.textButton}>Analyze</Text>
                    </TouchableOpacity>
                 </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#d32c2c",
        padding: 20,
      },
      textButton:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'Futura',
      },
      containerButton:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });
  