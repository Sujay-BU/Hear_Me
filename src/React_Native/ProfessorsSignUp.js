import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ProfessorSignUp.js
export default function ProfessorSignUp(){

    //Creating 8 state hooks/variables  whose default value is an empty string
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [universityEmail, setUniversityEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [retypeLoginPassword, setRetypeLoginPassword] = useState('');
    const [examOne, setExamOne] = useState('');
    const [examTwo, setExamTwo] = useState('');
    const [examThree, setExamThree] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorsLoginPage.js
    function navigateToProfessorsLoginOptionsPage() {
        navigation.navigate("Professors Login Page");
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to sign a professor up
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function insertProfessor() {
        fetch('http://192.168.0.147:30000/insertProfessor', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({firName: firstName, lasName: lastName, email: universityEmail, password: loginPassword, exOne: examOne, exTwo: examTwo, exThree: examThree})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') alert("Registered successfully! "); else alert('Unable to register!'); })
        .catch((err) => { alert(err); });
    }

    //Function to trim all fields of whitespaces and check if they are empty. If so, an appropriate altert is thrown and the execution flow is stopped
    function validateForm() {
        if (firstName.trim() == "") {
            alert("The first name field is empty! Enter your first name!");
            return false;
        }

        if (lastName.trim() == "") {
            alert("The last name field is empty! Enter your last name!");
            return false;
        }

        if(universityEmail.trim() == "") {
            alert("The university email field is empty! Enter your university email!");
            return false;
        }

        if (loginPassword.trim() == "") {
            alert("The password field is empty! Enter a password!");
            return false;
        }

        if (retypeLoginPassword.trim() == "") {
            alert("The retype password field is empty! Reenter the password!");
            return false;
        }

        if (examOne.trim() == "") {
            alert("The subject one field is empty! Enter at least one subject you are in charge of!");
            return false;
        }

        if (loginPassword.trim() != retypeLoginPassword.trim()) {
            alert("The passwords you entered do not match! Enter them again!");
            return false;
        }

        return true;
    }

    //Function to validate the form and sign up the professor if the form validated successfully
    function validateAndInsertProfessor() {
        if(validateForm()) {
            insertProfessor();
        }
    }

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToProfessorsLoginOptionsPage} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Register your new account</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View style={styles.imageAndSubmitButtonView}>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox for the form to be filled to sign a professor up*/}
            <View style={styles.inputs}>
                <View>
                    <Text style={styles.inputLabel}>FIRST NAME*</Text>
                    <TextInput onChangeText={firstName => setFirstName(firstName)} defaultValue={firstName} placeholder="Type in your first name" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>LAST NAME*</Text>
                    <TextInput onChangeText={lastName => setLastName(lastName)} defaultValue={lastName} placeholder="Type in your last name" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>UNIVERSITY EMAIL*</Text>
                    <TextInput onChangeText={universityEmail => setUniversityEmail(universityEmail)} defaultValue={universityEmail} placeholder="Type in your university email" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>PASSWORD*</Text>
                    <TextInput onChangeText={loginPassword => setLoginPassword(loginPassword)} defaultValue={loginPassword} secureTextEntry={true} placeholder="Type in your password" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>RETYPE PASSWORD*</Text>
                    <TextInput onChangeText={retypeLoginPassword => setRetypeLoginPassword(retypeLoginPassword)} defaultValue={retypeLoginPassword} secureTextEntry={true} placeholder="Retype your Password" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>SUBJECT CODE ONE:*</Text>
                    <TextInput onChangeText={examOne => setExamOne(examOne)} defaultValue={examOne} placeholder="Enter a subject code" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>SUBJECT CODE TWO:</Text>
                    <TextInput onChangeText={examTwo => setExamTwo(examTwo)} defaultValue={examTwo} placeholder="Enter another subject code" style={styles.input} />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>SUBJECT CODE THREE:</Text>
                    <TextInput onChangeText={examThree => setExamThree(examThree)} defaultValue={examThree} placeholder="Enter another subject code" style={styles.input} />
                </View>

                <TouchableOpacity onPress={validateAndInsertProfessor} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Sign-up</Text>
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
        width: 70,
        height: 100,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 10,
    },
    inputs: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        justifyContent: 'center',
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
        color: 'white'
    },
    inputView: {
        marginTop: 30,
    },
    imageAndSubmitButtonView: {
        flexDirection: 'row',
    },
    submitButton: {
        marginTop: 30,
        borderRadius: 20,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fffdd0',
    },
    submitButtonText: {
        fontSize: 30,
        fontFamily: "Copperplate",
    },
});