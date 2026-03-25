import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

//Function that takes care of the creation of the  page LoginPageProfessors.js
export default function LoginPageProfessors(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorsLogin.js
    function navigateToProfessorsLoginPage() {
        navigation.navigate("Professors Login");
    }

    //Function to navigate to the page ProfessorsSignup.js
    function navigateToProfessorsSignupPage() {
        navigation.navigate("Professors Signup");
    }

    //Function to navigate to the page LoginOptions.js
    function navigateToStartPage() {
        navigation.navigate("Login Options");
    }

    //Function to speak some sentences defined below
    function warning() {
        const thingToSay = "This is the professors login portal. Please go back if you are a student.";
        Speech.speak(thingToSay);
    }
    //Calling the above function
    warning();

    //Function to speak some sentences defined below
    function goBackPuttonPlacement() {
        const thingToSay = "The back button is at the top right of the screen.";
        Speech.speak(thingToSay);
    }
    //Calling the above function
    goBackPuttonPlacement();

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToStartPage} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Hear Me For Professors</Text>
            </View>
            
            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox that contains buttons to navigate to the signup and login pages*/}
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={navigateToProfessorsSignupPage} style={styles.buttonOneStyle}>
                    <Text style={styles.buttonText}>Sign-up</Text>
                </TouchableOpacity>

                <View style={styles.spacesOne}></View>

                <TouchableOpacity onPress={navigateToProfessorsLoginPage} style={styles.buttonTwoStyle}>
                    <Text style={styles.buttonText}>Login</Text>
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
    backButtonView: {
        position: 'absolute',
        right: 0,
        marginTop: 10,
    },
    backButton: {
        padding: 10,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginRight: 5,
    },
    backButtonText: {
        fontSize: 25,
        fontFamily: "Copperplate",
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
        marginTop: 20,
        borderRadius: 30,
    },
    buttonView: {
        marginTop: 28,
        height: 166,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: "Copperplate",
        fontSize: 30,
    },
    buttonOneStyle: {
        backgroundColor: '#fffdd0',
        width: 375,
        alignItems: 'center',
        padding: 26,
        borderWidth: 3,
        borderColor: '#FF99A9',
        borderRadius: 30,
    },
    buttonTwoStyle: {
        backgroundColor: '#fffdd0',
        width: 375,
        alignItems: 'center',
        padding: 26,
        borderWidth: 3,
        borderColor: '#FF99A9',
        borderRadius: 30,
        marginTop: 15,
    },
    spacesOne: {
        /* height: 50, */
    }
});