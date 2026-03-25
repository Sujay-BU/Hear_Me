import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react/cjs/react.development';

//Function that takes care of the creation of the  page StudentSelectorMarks.js
export default function StudentSelectorMarks(){

    //Creating 9 state hooks/variables  whose default value is an empty string, NULL, No second subject or 
    //No third subject
    const [firstNameOne, setFirstNameOne] = useState('');
    const [lastNameOne, setLastNameOne] = useState('');
    const [studentIDOne, setStudentIDOne] = useState('');
    const [firstNameTwo, setFirstNameTwo] = useState('');
    const [lastNameTwo, setLastNameTwo] = useState('');
    const [studentIDTwo, setStudentIDTwo] = useState('');

    const [subjectOne, setSubjectOne] = useState('NULL');
    const [subjectTwo, setSubjectTwo] = useState('No second subject');
    const [subjectThree, setSubjectThree] = useState('No third subject');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorLoggedIn.js
    function navigateToProfessorLoggedIn() {
        navigation.navigate("Professor Logged In");
    }

    //Function to navigate to the page StudentSubjectSelectorMarks.js and sends data in json format to the page
    function navigateToStudentSubjectSelectorMarks(stuID, firstName, lastName) {
        navigation.navigate("Student Subject Selector Marks", {studentID: stuID, firName: firstName, lasName: lastName, subOne: subjectOne, subTwo: subjectTwo, subThree: subjectThree});
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to retrieve the names of the
    //students that the professor teaches
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

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to retrieve the subjects a particular
    //student studies as specified by the parameter accepted by the function
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function getStudentsSubjects(stuID) {
        fetch('http://192.168.0.147:30000/getStudentsSubjects', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({studentID: stuID})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') { if(responseData.message[0].exam_one != null) setSubjectOne(responseData.message[0].exam_one); if(responseData.message[0].exam_two != null) setSubjectTwo(responseData.message[0].exam_two); if(responseData.message[0].exam_three != null) setSubjectThree(responseData.message[0].exam_three)} else alert('Unable to retrieve students subjects!'); })
        .catch((err) => { alert(err); });
    }

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
                <Text style={styles.headingText}>Select the student to upload marks for</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox that constains buttons for each student the professor teaches*/}
            <View style={styles.studentsView}>
                <TouchableOpacity onPress={() => {getStudentsSubjects(studentIDOne); navigateToStudentSubjectSelectorMarks(studentIDOne, firstNameOne, lastNameOne);}} style={styles.createExamButton}>
                    <Text style={styles.createExamButtonText}>{firstNameOne} {lastNameOne}</Text>
                    <Text style={styles.createExamButtonText}>{studentIDOne}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {getStudentsSubjects(studentIDTwo); navigateToStudentSubjectSelectorMarks(studentIDTwo, firstNameTwo, lastNameTwo);}} style={styles.editExamButton}>
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