import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    status === 'granted' ? this.setState({ hasPermission: status === 'granted' }) : alert('Désolée, l\'application a besoin d\'accéder à la caméra pour fonctionner!')
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      let photo = await this.camera.takePictureAsync(options);
      var picturePath = photo.uri;
      var pictureBase = photo.base64;
      this.props.navigation.navigate('showPicture', {photo: picturePath, base : pictureBase});
    }
  }

  render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        L'accès à la caméra n'est pas autorisé, merci de modifier cela dans les paramètres généraux de votre téléphone
        </Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref;}}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"center", alignItems: 'flex-end',margin:20}}>
              <TouchableOpacity
                  style={styles.icone}
                  onPress={()=>{this.takePicture()}}>
                    <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                    />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
