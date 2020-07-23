import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { getResultFromApi } from '../api/googleVision'

class ResultScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: undefined, 
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
      }
      
      componentDidMount() {
        getResultFromApi(this.props.navigation.state.params.base).then(data => {
            var i = 0;
            while (i < 5) {
                let desc = data.responses[0].labelAnnotations[i].description;
                console.log("DATA =", desc)
                if (desc === "Apple") {
                    this.setState({
                        result: desc,                   
                      })
                    console.log("OUIIII, Raph je t aime t es trop fort")
                }
                i++;
            }
            this.setState({
                isLoading: false
              })
          
        })
      }

   
      displayLoading() {
        if (this.state.isLoading) {
          // Si isLoading vaut true, on affiche le chargement à l'écran
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
            </View>
          )
        }
      }

      displayResult(){
        const { result } = this.state
        // console.log(result);
        if (result != undefined) {
          return (
              <Text>C'EST UNE POMME  </Text>
          )
        }
        else {
            return (
                <Text>CE N'EST PAS UNE POMME  </Text>
            )
        }
      }

      render() {
        let pictureBase = this.props.navigation.state.params.base;
        // console.log(this.props);
        return (
          <View style={styles.main_container}>
            {this.displayLoading()}
            {this.displayResult()}
          </View>
        )
      }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  
export default ResultScreen;
