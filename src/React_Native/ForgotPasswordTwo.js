import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react/cjs/react.development';

//Function that takes care of the creation of the  page ForgotPasswordTwo.js and recieves some json data from
//the previous page ForgotPasswordOne.js through the object route
export default function ForgotPasswordTwo({route}){

    //A variable is assigned the value of the parameters passed in the route object
    const {email} = route.params;

    //Creating a state hook/variable whose default value is an empty string
    const [code, setCode] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ForgotPasswordOne.js
    function navigateToForgotPasswordOne() {
        navigation.navigate("Professors Forgot Password One");
    }

    //Function to navigate to the page ForgotPasswordThree.js while sending the email address typed by the user
    //from the page ForgotPasswordOne.js in json format
    function navigateToForgotPasswordThree() {
        navigation.navigate("Professors Forgot Password Three", {emailAddress: email});
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to delete the already existing
    //random code in the database for the particular email address
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function deletePreviousCodes() {
        fetch('http://192.168.0.147:30000/deleteCodes', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({universityEmail: email})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message == 'false') alert('Unable to remove codes!'); })
        .catch((err) => { alert(err); });
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to verify the code entered by
    //the user with the code in the database
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function verifyCodeEntered() {
        fetch('http://192.168.0.147:30000/verifyCodeEntered', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({numbers: code})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') {alert("Correct code entered!"); deletePreviousCodes(); navigateToForgotPasswordThree();} else alert('Incorrect code entered!'); })
        .catch((err) => { alert(err); });
    }

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
             {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToForgotPasswordOne} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>A verification code was sent  to your email</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox for the form to be filled to verify the code entered by the user and the submit button*/}
            <View style={styles.userInputView}>
                <View>
                    <Text style={styles.inputLabel}>VERIFICATION CODE*</Text>
                    <TextInput onChangeText={code => setCode(code)} defaultValue={code} placeholder="Enter the verification code" style={styles.input} />
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={verifyCodeEntered} style={styles.submitButton}>
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
        marginTop: 20,
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
        marginTop: 25,
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