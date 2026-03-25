import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ForgotPasswordOne.js
export default function ForgotPasswordOne(){

    //Creating a state hook/variable whose default value is an empty string
    const [universityEmail, setUniversityEmail] = useState('');

    //A variable that will hold a random number, default value is set to 0
    let randomNumber = 0;

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorsLogin.js
    function navigateToProfessorsLogin() {
        navigation.navigate("Professors Login");
    }

    //Function to navigate to the page ProfessorsForgotPasswordTwo.js and send a json object with the 
    //university email entered by the user
    function navigateToForgotPasswordTwo() {
        navigation.navigate("Professors Forgot Password Two", {email: universityEmail});
    }

    //Function to generate a random 6 digit number
    function generateRandomNumber() {
        return Math.floor(Math.random() * (999999 - 99999) + 99999);
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to add the random number to the
    //database
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function addRandomNumberToDatabase() {
        fetch('http://192.168.0.147:30000/addRandomNumber', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email: universityEmail, number: randomNumber})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message == 'false') alert('Unable to add random number!'); })
        .catch((err) => { alert(err); });
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to check if the email address
    //exists in the database
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function checkEmailInDatabase() {
        fetch('http://192.168.0.147:30000/checkEmail', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({email: universityEmail})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') {randomNumber = generateRandomNumber(); addRandomNumberToDatabase(); navigateToForgotPasswordTwo();} else alert('Email address is not registered!'); })
        .catch((err) => { alert(err); });
    }

    //Function that checks if the email field is empty
    function validateEmail() {
        if (universityEmail.trim() == "") {
            alert("The university email field is empty! Enter your university email!");
            return false;
        }

        return true;
    }

    //Validates the email field and then checks if the email address is in the database if there are no issues with the
    //validation
    function checkEmail() {
        if (validateEmail()) {
            checkEmailInDatabase();
        }
    }

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToProfessorsLogin} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Forgot your password?</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox for the form to be filled to create an exam along with the button to submit the form*/}
            <View style={styles.userInputView}>
                <View>
                    <Text style={styles.inputLabel}>UNIVERSITY EMAIL*</Text>
                    <TextInput onChangeText={universityEmail => setUniversityEmail(universityEmail)} defaultValue={universityEmail} placeholder="Enter your university email" style={styles.input} />
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={checkEmail} style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
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
    userInputView: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
    },
    inputLabel: {
        color: 'white',
        fontSize: 15,
    },
    input: {
        fontSize: 23,
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        color: 'white',
    },
    buttons: {
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        height: 130,
    },
    submitButton: {
        marginTop: 40,
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 20,
        backgroundColor: '#fffdd0',
    },
    submitText: {
        fontFamily: "Copperplate",
        fontSize: 25,
    },
});