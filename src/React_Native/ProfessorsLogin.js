import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ProfessorLogin.js
export default function ProfessorLogin(){

    //Creating 2 state hooks/variables  whose default value is an empty string
    const [universityEmail, setUniversityEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorsLoginPage.js
    function navigateToProfessorsLoginOptionsPage() {
        navigation.navigate("Professors Login Page");
    }

    //Function to navigate to the page ForgotPasswordOne.js
    function navigateToForgotPasswordOne() {
        navigation.navigate("Professors Forgot Password One");
    }

    //Function to navigate to the page ProfessorLoggedIn.js
    function navigateToProfessorLoggedIn() {
        navigation.navigate("Professor Logged In");
    }

    //Function to check if the email and password fileds are empty or not
    function validateCredentials() {
        if(universityEmail.trim() == "")
            alert("The university email field is empty! Enter your university email!");

        if (loginPassword.trim() == "")
            alert("The password field is empty! Enter a password!");
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to verify the users credentials
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    const databaseValidation = () => {
        fetch('http://192.168.0.147:30000/databaseCred', {
        method: 'POST',
        headers: { 
           'Content-Type': 'application/json' 
           },
        body: JSON.stringify({username: universityEmail, password: loginPassword})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message == 'true') navigateToProfessorLoggedIn(); else alert('Unable to login! Check your username or password!'); })
        .catch((err) => { alert(err); });
    };

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToProfessorsLoginOptionsPage} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Professors Login</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox for the form to be filled to login*/}
            <View style={styles.userInputView}>
                <View>
                    <Text style={styles.inputLabel}>UNIVERSITY EMAIL*</Text>
                    <TextInput onChangeText={universityEmail => setUniversityEmail(universityEmail)} defaultValue={universityEmail} placeholder="Enter your university email" style={styles.input} />
                </View>

                <View style={styles.passwordView}>
                    <Text style={styles.inputLabel}>PASSWORD*</Text>
                    <TextInput onChangeText={loginPassword => setLoginPassword(loginPassword)} defaultValue={loginPassword} secureTextEntry={true} placeholder="Enter your password" style={styles.input} />
                </View>
            </View>

            {/*View/flexbox that contains the login and forgot password buttons*/}
            <View style={styles.buttons}>
                <TouchableOpacity onPress={databaseValidation} style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToForgotPasswordOne} style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
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
        width: 140,
        height: 200,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 10,
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
    passwordView: {
        marginTop: 20,
    },
    buttons: {
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        height: 130,
    },
    loginButton: {
        marginTop: 23,
        padding: 15,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 20,
        backgroundColor: '#fffdd0',
    },
    loginText: {
        fontFamily: "Copperplate",
        fontSize: 25,
    },
    forgotPasswordButton: {
        marginTop: 18,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#fffdd0',
    },
    forgotPasswordText: {
        fontFamily: "Copperplate",
        fontSize: 20,
    }
});