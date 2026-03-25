import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

//Function that takes care of the creation of the  page StudentLoggedIn.js
export default function StudentLoggedIn(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page StudentsLoginPage.js
    function navigateToStudentsLoginPage() {
        navigation.navigate("Students Login Page");
    }

    //Function to navigate to the page ViewMarksStudent.js
    function navigateToViewMarksStudent() {
        navigation.navigate("View Marks Student");
    }

    //Function to speak a sentence defined below
    function speakGreeting() {
        const thingToSay = "Welcome Mr.Joseph Falon!";
        Speech.speak(thingToSay);
    }

    //Calling the above function
    speakGreeting();

    //Function to speak a sentence defined below
    function speakAboutTheButtons() {
        const thingToSay = "The view marks button is at the very bottom of the page and the exam portal is right above it.";
        Speech.speak(thingToSay);
    }
    //Calling the above function
    speakAboutTheButtons();

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToStudentsLoginPage} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Welcome Mr.Joseph Falon!</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox that contains buttons for the exam portal and viewing marks*/}
            <View>
                <TouchableOpacity style={styles.examButton}>
                    <Text style={styles.examButtonText}>Exam portal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToViewMarksStudent} style={styles.marksButton}>
                    <Text style={styles.examButtonText}>View marks</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        width: 210,
        height: 300,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 10,
    },
    buttonView: {
        marginTop: 5,
        height: 256,
        alignContent: 'center',
        justifyContent: 'center',
    },
    pictureButton: {
        height: 240,
        backgroundColor: '#fffdd0',
        justifyContent: 'center',
    },
    picText: {
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontFamily: "Copperplate",
        marginLeft: 74,
    },
    examButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 25,
    },
    examButtonText: {
        fontSize: 35,
        fontFamily: "Copperplate",
        textAlign: "center",
    },
    marksButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 16,
    },
});