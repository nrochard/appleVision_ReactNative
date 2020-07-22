import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class HomeScreen extends React.Component {
    
    displayCamera = () => {
        console.log(this.props);
        this.props.navigation.navigate('CameraScreen');
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>AppleVision</Text>
                </View>
                <View style={{ flex: 4}}>
                    <Image 
                    style={styles.apple}
                     source={require('../../assets/images/apple_home.png')} />
                     <Text style={styles.tag}>L'application capable de reconnaître une pomme.</Text>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.displayCamera()}>
                        <Text style={styles.textButton}>Let's go</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontFamily: 'Futura',
        fontSize: 35
    },
    apple: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    tag: {
        fontFamily: 'Futura',
        textAlign: 'center',
        fontSize : 18
    },
    containerButton:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 20,
    },
    textButton:{
        fontSize: 20,
        fontFamily: 'Futura',
    }
});

export default HomeScreen