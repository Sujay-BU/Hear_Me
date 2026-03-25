import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SliderComponent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from "react-native-image-slider-box";
import * as Speech from 'expo-speech';

//Function that takes care of the creation of the  page LoginOptionsPage.js
export default function LoginPageOptions(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();
    
    //Creating a variable that holds an image and image url's in json format that will be displayed in an image
    //slider to the user
    let sliderImages = {
        images: [
            require('../assets/Logo.jpeg'),
            "AI.jpg",
            "Face_ID.jpg",
            "TTS.jpg",
            "Database_Server.jpg",
        ]
    }

    //Function to navigate to the page ProfessorsLoginPage.js
    function navigateToProfessorsLoginPage() {
        navigation.navigate("Professors Login Page");
    }

    //Function to navigate to the page StudentsLoginPage.js
    function navigateToStudentsLoginPage() {
        navigation.navigate("Students Login Page");
    }

    //Function that speaks a particular sentence
    function introSpeech() {
        const thingToSay = "Hello there, welcome to Hear Me. Are you a student or professor?";
        Speech.speak(thingToSay);
    }
    //Calling the above function
    introSpeech();

    //Function that speaks a particular sentence
    function buttonPlacement() {
        const thingToSay = "On the bottom right of the screen we have the student button and on the bottom left we have the professors button.";
        Speech.speak(thingToSay);
    }
    //Calling the above function
    buttonPlacement();

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*Sliderbox tag that displays images while automatically sliding between images*/}
            <SliderBox images={sliderImages.images} sliderBoxHeight={597} autoplay circleLoop
            paginationBoxVerticalPadding={15} ImageComponentStyle={{width: 375}} resizeMode='contain' />

            {/*View/Flexbox that contains buttons tha naviages to the professors login page and students login page*/}
            <View style={styles.bottomHalf}>
                <TouchableOpacity onPress={navigateToProfessorsLoginPage} style={styles.buttonOneStyle}>
                    <Text style={styles.buttonText}>Professor</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToStudentsLoginPage} style={styles.buttonTwoStyle}>
                    <Text style={styles.buttonText}>Student</Text>
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
    bottomHalf: {
        flexDirection: 'row',
    },
    buttonOneStyle: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffdd0',
        width: 195,
    },
    buttonTwoStyle: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffdd0',
        width: 180,
    },
    buttonText: {
        fontSize: 28,
        fontFamily: "Copperplate",
    },
});