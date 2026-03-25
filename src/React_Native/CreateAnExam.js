import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page createanexam.js
export default function CreateAnExam(){

    //Creating 4 state hooks/variables  whose default value is an empty string
    const [subjectCode, setSubjectCode] = useState('');
    const [examDate, setExamDate] = useState('');
    const [examStartTime, setExamStartTime] = useState('');
    const [examEndTime, setExamEndTime] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page CreateEditExam.js
    function navigateToCreateEditExam() {
        navigation.navigate("Create Edit Exam");
    }

    //Function to navigate to the page ExamQuestions.js along with sending a json object with the subject code and exam date entered by the user
    function navigateToExamQuestions() {
        navigation.navigate("Exam Questions", {subject: subjectCode, examD: examDate});
    }

    //Function to trim all fields of whitespaces and check if they are empty. If so, an appropriate altert is thrown and the execution flow is stopped
    function validateForm() {
        if (subjectCode.trim() == "") {
            alert("The subject code field is empty! Enter the exam's subject code!");
            return false;
        }

        if (examDate.trim() == "") {
            alert("The exam date field is empty! Enter the exam's date!");
            return false;
        }

        if(examStartTime.trim() == "") {
            alert("The exam's start time field is empty! Enter the exam's start time!");
            return false;
        }

        if (examEndTime.trim() == "") {
            alert("The exam's end time field is empty! Enter the exam's end time!");
            return false;
        }
        
        //Making use of regex to make sure date entered is of the format DD-MM-YYYY
        if (/\d{2}-\d{2}-\d{4}/.test(examDate.trim()) == false) {
            alert("The exam date you entered does not match the required format!");
            return false;
        }

        //Making use of regex to make sure the time entered is of the format HH-MM-SS
        if (/\d{2}:\d{2}:\d{2}/.test(examStartTime.trim()) == false) {
            alert("The exam start time you entered does not match the required format!");
            return false;
        }

        //Making use of regex to make sure the time entered is of the format HH-MM-SS
        if (/\d{2}:\d{2}:\d{2}/.test(examEndTime.trim()) == false) {
            alert("The exam end time you entered does not match the required format!");
            return false;
        }

        return true;
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to create an exam
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function createExam() {
        fetch('http://192.168.0.147:30000/createExam', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({examID: subjectCode, examDates: examDate, examStartTimes: examStartTime, examEndTimes: examEndTime})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message == 'true') alert("Exam creation complete!"); else alert('Creation of exam failed! Please try again!'); })
        .catch((err) => { alert(err); });
    }

    //Function to validate the form, create an exam and navigate to the next page if successfully validated
    function validateAndCreateExam() {
        if (validateForm()) {
            createExam();
            navigateToExamQuestions();
        }
    }

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToCreateEditExam} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Create An Exam</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app and the create exam button*/}
            <View style={styles.imageAndSubmitButtonView}>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />

                <TouchableOpacity onPress={validateAndCreateExam} style={styles.createExamButton}>
                    <Text style={styles.createExamButtonText}>Create Exam</Text>
                </TouchableOpacity>
            </View>

            {/*View/flexbox for the form to be filled to create an exam*/}
            <View style={styles.inputs}>
                <View style={styles.subjectCodeInput}>
                    <Text style={styles.inputLabel}>SUBJECT CODE*</Text>
                    <TextInput onChangeText={subjectCode => setSubjectCode(subjectCode)} defaultValue={subjectCode} placeholder="Type in the exam's subject code" style={styles.input} />
                </View>

                <View style={styles.examDateInput}>
                    <Text style={styles.inputLabel}>EXAM DATE* (DD-MM-YYYY)</Text>
                    <TextInput onChangeText={examDate => setExamDate(examDate)} defaultValue={examDate} placeholder="Type in the date of the exam" style={styles.input} />
                </View>

                <View style={styles.examStartTimeInput}>
                    <Text style={styles.inputLabel}>EXAM START TIME* (HH:MM:SS)</Text>
                    <TextInput onChangeText={examStartTime => setExamStartTime(examStartTime)} defaultValue={examStartTime} placeholder="Type in the start time of the exam" style={styles.input} />
                </View>

                <View style={styles.examEndTimeInput}>
                    <Text style={styles.inputLabel}>EXAM END TIME* (HH:MM:SS)</Text>
                    <TextInput onChangeText={examEndTime => setExamEndTime(examEndTime)} defaultValue={examEndTime} placeholder="Type in the end time of the exam" style={styles.input} />
                </View>
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
        width: 70,
        height: 100,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 10,
    },
    inputs: {
        marginTop: 5,
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
    subjectCodeInput: {

    },
    examDateInput: {
        marginTop: 50,
    },
    examStartTimeInput: {
        marginTop: 50,
    },
    examEndTimeInput: {
        marginTop: 50,
    },
    imageAndSubmitButtonView: {
        flexDirection: 'row',
    },
    createExamButton: {
        marginTop: 33,
        marginLeft: 30,
        borderRadius: 20,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fffdd0',
    },
    createExamButtonText: {
        fontSize: 30,
        fontFamily: "Copperplate",
    },
});