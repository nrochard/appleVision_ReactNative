import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getResultFromApi } from '../api/googleVision';
import uuid4 from "uuid4";
import * as firebase from 'firebase';
import ApiKeys from '../config/Firebase';
import * as Random from 'expo-random';

class ResultScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: undefined, 
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
        if (!firebase.apps.length) {firebase.initializeApp(ApiKeys.FirebaseConfig); }
      }
      
      componentDidMount() {
        getResultFromApi(this.props.navigation.state.params.base).then(data => {
            for (const label of data.responses[0].labelAnnotations) {
              // console.log("DATA =", data)
              if (label.description === 'Apple') {
                this.setState({
                  result: label.description,                   
                })
              }
            }
            // console.log(this.props.navigation.state.params.photo);
            let pathName = this.props.navigation.state.params.photo;
            let imageName = pathName.split('/');
          
              this.uploadImage(this.props.navigation.state.params.photo, imageName[14])
              .then(() => {
                Alert.alert("Success");
              })
              .catch((error) => {
                console.log(error);
              });

              this.storeImage(this.props.navigation.state.params.photo, imageName[14])
              // .then(() => {
              //   Alert.alert("Success");
              // })
              // .catch((error) => {
              //   console.log(error);
              // });
            this.setState({
                isLoading: false
              })
        })
      }

      storeImage = async (uri, photoName) => {
        var id = uuid4();
        const uploadData = {
        id: id,
        photoPath: uri,
        photoName: photoName
        }
        if (this.state.result === 'Apple'){
          return firebase
          .firestore()
          .collection('Success')
          .doc(id)
          .set(uploadData)
        }
        else{
          return firebase
          .firestore()
          .collection('Unknown')
          .doc(uploadData.photoName)
          .set(uploadData)
        }
      }

      uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        if (this.state.result === 'Apple'){
          var ref = firebase.storage().ref().child("success/" + imageName);
        }
        else{
          var ref = firebase.storage().ref().child("error/" + imageName);
        }
        return ref.put(blob);
      }

      displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }

      displayResult(){
        const { result } = this.state
        if (result != undefined) {
          return (
              <View style={styles.main_container_apple}>
                <Text style={styles.text_result}>C'est une pomme</Text>
              </View>

          )
        }
        else {
            return (
                <View style={[styles.main_container_error]}>
                    <Text style={styles.text_result}>Ce n'est pas une pomme</Text>
                </View>
            )
        }
      }

      render() {
        return (
          <View style={styles.main_container}>
            {this.displayLoading()}
            {!this.state.isLoading ? this.displayResult() : null}
          </View>
        )
      }
}


const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    main_container_apple: {
        flex: 1,
        width : '100%',
        justifyContent: 'center',
        backgroundColor: '#2e7d32',
      },
      main_container_error: {
        flex: 1,
        width : '100%',
        justifyContent: 'center',
        backgroundColor: '#d32f2f'
      },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text_result: {
        fontSize: 60,
        fontFamily: 'Futura',
        color: '#FFFFFF',
        textAlign: 'center'
    }
  })

  
export default ResultScreen;
