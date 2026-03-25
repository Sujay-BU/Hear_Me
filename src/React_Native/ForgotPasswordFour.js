import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ForgotPasswordFour.js
export default function ForgotPasswordFour(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorsLogin.js
    function navigateToProfessorsLogin() {
        navigation.navigate("Professors Login");
    }

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Your password has been reset successfully!</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app and the create exam button*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox that contains the button to go back to the professors login page*/}
            <View style={styles.buttons}>
                <TouchableOpacity onPress={navigateToProfessorsLogin} style={styles.submitButton}>
                    <Text style={styles.submitText}>Go back to the login screen</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

//CSS styles for different components of the page
const styles = StyleSheet.create({
    wholePage: {
        flex: 1,
        backgroundColor: '#FF99A9',
    },
    heading: {
        marginLeft: 30,
        marginTop: 70,
    },
    headingText: {
        fontSize: 40,
        fontFamily: "Copperplate",
    },
    imageStyle: {
        width: 200,
        height: 280,
        marginLeft: 30,
        marginTop: 10,
        borderRadius: 30,
    },
    buttons: {
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        height: 186,
    },
    submitButton: {
        marginTop: 55,
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 20,
        backgroundColor: '#fffdd0',
    },
    submitText: {
        fontFamily: "Copperplate",
        fontSize: 25,
        textAlign: 'center',
    },
});