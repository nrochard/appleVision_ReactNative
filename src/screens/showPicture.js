import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Environment from '../config/Environment';

export default class ProfileImageEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       googleResponse: '',
       isLoading: true
    }
}

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let image  = this.props.navigation.state.params.photo;
      console.log('photo path =', image);
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "LABEL_DETECTION", maxResults: 5 },
              // { type: "LANDMARK_DETECTION", maxResults: 5 },
              // { type: "LOGO_DETECTION", maxResults: 5 },
              // { type: "TEXT_DETECTION", maxResults: 5 },
              // { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
              // { type: "IMAGE_PROPERTIES", maxResults: 5 },
              // { type: "CROP_HINTS", maxResults: 5 },
              // { type: "WEB_DETECTION", maxResults: 5 }
            ],
            image: {
              source: {
                imageUri: 'https://img-3.journaldesfemmes.fr/MCx4w7IOSyAvoIsvwADMRHU5mz0=/910x607/smart/899c9ccb1d6f4bfcbb2fdfed9d11c970/ccmcms-jdf/10662634.jpg'
              }
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
    
  };

  displayLoading(){
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
    render() {
        // console.log(this.props)
        let picturePath = this.props.navigation.state.params.photo;
        // console.log(picturePath);
        return (
                <View style={styles.container}>
                <Image source={{uri:picturePath}} style={{width: 400, height: 500}} />
                <View style={styles.containerButton}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {this.props.navigation.navigate('ResultScreen', {photo: picturePath, base: this.props.navigation.state.params.base})}}>
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
  