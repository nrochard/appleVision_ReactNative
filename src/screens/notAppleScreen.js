import React, { Component } from 'react';
import ApiKeys from '../config/Firebase';
import * as firebase from 'firebase';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, ActivityIndicator, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: [],
      isLoading: false
    }
    if (!firebase.apps.length) {firebase.initializeApp(ApiKeys.FirebaseConfig); }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchPosts()
  }

  fetchPosts = async () => {
    try {
      const posts = await this.getPosts()
      this.setState({ 
        pictures: posts,
        isLoading: false 
        })
    } catch (e) {
      console.error(e)
    }
  }

  getPosts = () => {
    return firebase
      .firestore()
      .collection('Unknown')
      .orderBy("date", "desc")
      .get()
      .then(function(querySnapshot) {
        let posts = querySnapshot.docs.map(doc => doc.data())
        return posts
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Autres photos</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.fetchPosts()}>
              <FontAwesome
                name="refresh"
                style={{ color: "black", fontSize: 40}}
              />
          </TouchableOpacity>
        </View>
       <View style={{flex: 9}}>
        <FlatList
          data={this.state.pictures}
          renderItem={({item}) => {
            return <View style={styles.containerImage}>
              <Image source={{uri: item.photoPath}}  style={styles.sizeImage}/>
              </View>
            }}
          numColumns={2}
        />
       </View>
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    backgroundColor: '#d32f2f'
  },
  headerContainer:{
  backgroundColor: 'white',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10
  },
  title: {
    fontSize: 30,
    backgroundColor: 'white',
    fontFamily: 'Futura'
  },
  containerImage: {
    flex: 1,
    flexDirection: 'column',
    margin: 5
  },
  sizeImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});