import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react/cjs/react.development';

//Function that takes care of the creation of the  page ForgotPasswordThree.js and recieves a json object
//from the previous page ForgotPasswordTwo.js
export default function ForgotPasswordThree({route}){

    //Constant variable that takes on a value from the route object
    const {emailAddress} = route.params;

    //Creating 2 state hooks/variables  whose default value is an empty string
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ForgotPasswordOne.js
    function navigateToForgotPasswordOne() {
        navigation.navigate("Professors Forgot Password One");
    }

    //Function to navigate to the page ForgotPasswordFour.js
    function navigateToForgotPasswordFour() {
        navigation.navigate("Professors Forgot Password Four");
    }

    //Function to check if the string entered in the password and retypepassword fileds are the same, in which
    //case true is returned, else false is returned
    function validateForm() {
        return (password.trim() == retypePassword.trim() ? true : false);
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to update the password of the
    //professor
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function updatePassword() {
        fetch('http://192.168.0.147:30000/updatePassword', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({pass: password, email: emailAddress})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') {navigateToForgotPasswordFour();} else alert('Unable to update password!'); })
        .catch((err) => { alert(err); });
    }

    //Function to validate the form and update the password is the form is successfully validated, else an
    //appropriate alert is issued
    function combined() {
        if (validateForm())
            updatePassword();
        else
            alert("The passwords do not match!");
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
                <Text style={styles.headingText}>Enter a new password</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox for the form to be filled to create an exam and the submit button*/}
            <View style={styles.userInputView}>
                <View>
                    <Text style={styles.inputLabel}>NEW PASSWORD*</Text>
                    <TextInput onChangeText={password => setPassword(password)} defaultValue={password} secureTextEntry={true} placeholder="Enter a new password" style={styles.input} />
                </View>

                <View style={styles.reenterNewPasswordInput}>
                    <Text style={styles.inputLabel}>REENTER NEW PASSWORD*</Text>
                    <TextInput onChangeText={retypePassword => setRetypePassword(retypePassword)} defaultValue={retypePassword} secureTextEntry={true} placeholder="Reenter the new password" style={styles.input} />
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity onPress={combined} style={styles.submitButton}>
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
        marginTop: 10,
        borderRadius: 30,
    },
    userInputView: {
        marginTop: 15,
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
        marginTop: 15,
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
    reenterNewPasswordInput: {
        marginTop: 17,
    }
});