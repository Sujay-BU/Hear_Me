import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { useState } from 'react/cjs/react.development';

//Function that takes care of the creation of the  page ViewMarksStudent.js
export default function ViewMarksStudent(){

    //Creating 6 state hooks/variables  whose default value is an empty string
    const [subjectOne, setSubjectOne] = useState('No Subject');
    const [subjectTwo, setSubjectTwo] = useState('No Subject');
    const [subjectThree, setSubjectThree] = useState('No Subject');
    const [gradeOne, setGradeOne] = useState('No Grade');
    const [gradeTwo, setGradeTwo] = useState('No Grade');
    const [gradeThree, setGradeThree] = useState('No Grade');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page StudentLoggedIn.js
    function navigateToStudentLoggedIn() {
        navigation.navigate("Student Logged In");
    }

    //Function that speaks some sentences related to the grades of a studentas per the number of subjects
    //taken by the student, as defined below
    function speakMarks() {
        const thingToSay = ((subjectTwo == 'No Subject' && gradeTwo == 'No Grade') ? "You received a " + gradeOne + " in " + subjectOne + "." : (subjectThree == 'No Subject' && gradeThree == 'No Grade') ? "You received a " + gradeOne + " in " + subjectTwo + " and a " + gradeTwo + " in " + subjectTwo + "." : "You received a " + gradeOne + " in " + subjectTwo + " and a " + gradeTwo + " in " + subjectTwo + " and a " + gradeThree + " in " + subjectThree + ".");
        Speech.speak(thingToSay);
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to retrieve subjects and grades
    //of a student
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function getSubjectsAndGrades() {
        fetch('http://192.168.0.147:30000/getSubjectsAndGrades', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({sample: 'sample'})
        })
        .then((response) => response.json())
        .then((responseData) => {if(responseData.message != 'false') {if (responseData.message[0] != undefined) {setSubjectOne(responseData.message[0].exam_id); setGradeOne(responseData.message[0].result);} if (responseData.message[1] != undefined) {setSubjectTwo(responseData.message[1].exam_id); setGradeTwo(responseData.message[1].result);} if (responseData.message[2] != undefined) {setSubjectThree(responseData.message[2].exam_id); setGradeThree(responseData.message[2].result);} speakMarks();} else alert('Unable to retrieve subjects and grades!');})
        .catch((err) => { alert(err); });
    }
    getSubjectsAndGrades();

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToStudentLoggedIn} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Marks</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox that contains text boxes that contain subjects and grades of a student*/}
            <View>
                <View style={styles.Triangle} />
                <Text style={styles.triangleText}>OVERALL{'\n'} GRADES</Text>
                <Text style={styles.upperMarks}>{subjectTwo}:{'\n'}    {gradeTwo}</Text>
                <Text style={styles.leftMarks}>{subjectOne}:{'\n'}    {gradeOne}</Text>
                <Text style={styles.rightMarks}>{subjectThree}:{'\n'}    {gradeThree}</Text>
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
        width: 110,
        height: 150,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 10,
    },
    Triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 120,
        borderRightWidth: 120,
        borderBottomWidth: 180,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'maroon',
        marginLeft: 70,
        marginTop: 100,
      },
      triangleText: {
        fontSize: 30,
        fontFamily: "Copperplate",
        color: 'white',
        marginTop: -80,
        marginLeft: 120,
      },
      upperMarks: {
        fontSize: 30,
        fontFamily: "Copperplate",
        color: 'white',
        marginTop: -235,
        marginLeft: 100,
      },
      leftMarks: {
        fontSize: 30,
        fontFamily: "Copperplate",
        color: 'white',
        marginTop: 205,
        marginLeft: 10,
      },
      rightMarks: {
        fontSize: 30,
        fontFamily: "Copperplate",
        color: 'white',
        marginTop: -61,
        marginLeft: 190,
      },
});