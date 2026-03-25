import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react/cjs/react.development';
//import RNVoipCall  from 'react-native-voip-call';

//Function that takes care of the creation of the  page StudentCallSelector.js
export default function StudentCallSelector(){

    //Creating 6 state hooks/variables  whose default value is an empty string
    const [firstNameOne, setFirstNameOne] = useState('');
    const [lastNameOne, setLastNameOne] = useState('');
    const [studentIDOne, setStudentIDOne] = useState('');
    const [firstNameTwo, setFirstNameTwo] = useState('');
    const [lastNameTwo, setLastNameTwo] = useState('');
    const [studentIDTwo, setStudentIDTwo] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorLoggedIn.js
    function navigateToProfessorLoggedIn() {
        navigation.navigate("Professor Logged In");
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to retrieve the names of the
    //students the professor teaches
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function getStudentNames() {
        fetch('http://192.168.0.147:30000/getStudentNames', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({sample: 'sample'})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') {setFirstNameOne(responseData.message[0].first_name); setLastNameOne(responseData.message[0].last_name); setStudentIDOne(responseData.message[0].student_id); setFirstNameTwo(responseData.message[1].first_name); setLastNameTwo(responseData.message[1].last_name); setStudentIDTwo(responseData.message[1].student_id);} else alert('Unable to retrieve student data!'); })
        .catch((err) => { alert(err); });
    }
    getStudentNames();

    /*
    function makeCall(studentID) {
        let options = {
            appName:'Hear Me', // Required
            includesCallsInRecents: true, // boolean (optional) If provided, calls will be shown in the recent calls 
            supportsVideo : false //boolean (optional) If provided, whether or not the application supports video calling (Default: true)
          }

          // Initlize Call Kit IOS is Required
          //RNVoipCall.initializeCall(options).then(()=>{
           //Success Call Back
          //}).catch(e=>console.log(e));
    }
    */

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToProfessorLoggedIn} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Select a  student to call</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox that contains buttons for each student the professor teaches*/}
            <View style={styles.studentsView}>
                <TouchableOpacity style={styles.createExamButton}>
                    <Text style={styles.createExamButtonText}>{firstNameOne} {lastNameOne}</Text>
                    <Text style={styles.createExamButtonText}>{studentIDOne}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.editExamButton}>
                <Text style={styles.createExamButtonText}>{firstNameTwo} {lastNameTwo}</Text>
                    <Text style={styles.createExamButtonText}>{studentIDTwo}</Text>
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
        width: 100,
        height: 140,
        marginLeft: 30,
        marginTop: 10,
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
    createExamButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 20,
    },
    createExamButtonText: {
        fontSize: 35,
        fontFamily: "Copperplate",
        textAlign: "center",
    },
    editExamButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 12,
    },
    callButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 16,
    },
    studentsView: {
        marginTop: 10,
    },
});