import React, { Component } from 'react';
import ApiKeys from '../config/Firebase';
import * as firebase from 'firebase';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Image } from 'react-native'

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
      // console.log("TEST RETOUR DES IMAGES = ", posts)
      this.setState({ 
        pictures: [ ...this.state.pictures, ...posts],
        isLoading: false 
        })
    } catch (e) {
      console.error(e)
    }
  }

  getPosts = () => {
    return firebase
      .firestore()
      .collection('Success')
      .get()
      .then(function(querySnapshot) {
        let posts = querySnapshot.docs.map(doc => doc.data())
        // console.log('posts =', posts[0].photoPath)
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
    console.log(this.state.pictures)
    const Friends = [
      { name: 'Friends #1'},
      { name: 'Friends #2'},
      { name: 'Friends #3'},
      { name: 'Friends #4'},
      { name: 'Friends #5'}
    ]
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.pictures}
          renderItem={({item}) => {
            return <Image source={{uri: item.photoPath}}  style={{width: 400, height: 500, marginBottom: 20}}></Image>
              // Text>{item.photoPath}</Text>
            
          }}
          />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    backgroundColor: '#2e7d32'
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
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