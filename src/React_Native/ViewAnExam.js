import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ViewAnExam.js
export default function ViewAnExam() {

    //Creating 7 state hooks/variables  whose default value is an empty string
    const [subjectCode, setSubjectCode] = useState('');
    const [dateOfExam, setDateOfExam] = useState('');
    const [questionOne, setQuestionOne] = useState('');
    const [questionTwo, setQuestionTwo] = useState('');
    const [questionThree, setQuestionThree] = useState('');
    const [questionFour, setQuestionFour] = useState('');
    const [questionFive, setQuestionFive] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page CreateEditExam.js
    function navigateToCreateEditExam() {
        navigation.navigate("Create Edit Exam");
    }

    //Function to navigate to the page ViewExam.js and sends some data to the page in json format
    function navigateToViewExam() {
        navigation.navigate("View Exam", {examID: subjectCode, examDate: dateOfExam, qOne: questionOne, qTwo: questionTwo, qThree: questionThree, qFour: questionFour, qFive: questionFive});
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to retrieve the exam questions
    //from the backend
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function viewExam() {
        fetch('http://192.168.0.147:30000/viewExam', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({examID: subjectCode, examDate: dateOfExam})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') {setQuestionOne(responseData.message[0].question); setQuestionTwo(responseData.message[1].question); setQuestionThree(responseData.message[2].question); setQuestionFour(responseData.message[3].question); setQuestionFive(responseData.message[4].question);} else alert('No questions available!'); })
        .catch((err) => { alert(err); });
    }

    //Function that calls the viewExam and navigateToViewExam functions
    function combined() {
        viewExam();
        navigateToViewExam();
    }

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToCreateEditExam} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>View An Exam</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox for the form to be filled to view an exam and the view exam button*/}
            <View style={styles.inputs}>
                <View style={styles.examid}>
                    <Text style={styles.inputLabel}>EXAM ID*</Text>
                    <TextInput onChangeText={subjectCode => setSubjectCode(subjectCode)} defaultValue={subjectCode} placeholder="Type in the exam id" style={styles.input} />
                </View>

                <View style={styles.dateOfExam}>
                    <Text style={styles.inputLabel}>DATE OF EXAM*</Text>
                    <TextInput onChangeText={dateOfExam => setDateOfExam(dateOfExam)} defaultValue={dateOfExam} placeholder="Type in the date of the exam" style={styles.input} />
                </View>

                <TouchableOpacity onPress={combined} style={styles.finishExamButton}>
                    <Text style={styles.finishExamButtonText}>View Exam</Text>
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
        width: 180,
        height: 250,
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
    examid: {

    },
    dateOfExam: {
        marginTop: 38,
    },
    questionOne: {
        marginTop: 40,
    },
    questionTwo: {
        marginTop: 40,
    },
    questionThree: {
        marginTop: 40,
    },
    questionFour: {
        marginTop: 40,
    },
    questionFive: {
        marginTop: 40,
    },
    imageAndSubmitButtonView: {
        flexDirection: 'row',
    },
    finishExamButton: {
        marginTop: 33,
        borderRadius: 20,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fffdd0',
    },
    finishExamButtonText: {
        fontSize: 30,
        fontFamily: "Copperplate",
    },
});