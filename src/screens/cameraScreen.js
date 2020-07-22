import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default class App extends React.Component {

  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
  }

  async componentDidMount() {
    this._getPermissionAsync()
  }

  _getPermissionAsync = async () => {
      // Camera roll Permission 
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // Camera Permission
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
  }

  _flipCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  _takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      var picturePath = photo.uri;
      this.props.navigation.navigate('showPicture', {photo: picturePath});
    //   console.log(this.props.navigation)
    // console.log(picturePath);
        
    }
  }

  _pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    var picturePath = photo.uri;
    this.props.navigation.navigate('showPicture', {photo: picturePath});
  }

  render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref;}}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>

              <TouchableOpacity
              style={styles.icone}
              onPress={()=>{this._pickImage()}}>
                <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40}}
                />
              </TouchableOpacity>
                
              <TouchableOpacity
                  style={styles.icone}
                  onPress={()=>{this._takePicture()}}>
                    <FontAwesome
                    name="camera"
                    style={{ color: "#fff", fontSize: 40}}
                    />
              </TouchableOpacity>
              
              <TouchableOpacity
              style={styles.icone}
              onPress={()=>{this._flipCameraType()}}>
                <MaterialCommunityIcons
                name="camera-switch"
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
  },
  icone:{
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});
