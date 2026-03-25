import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ExamQuestions.js and recieves some data from the
//the previous page CreateAnExam.js in json format using the route object
export default function ExamQuestions({route}) {

    //Assignng variables to the parameters sent in the route object
    const {subject, examD} = route.params;

    //Creating 5 state hooks/variables  whose default value is an empty string
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

    //Function to navigate to the page CreateAnExam.js
    function navigateToCreateAnExam() {
        navigation.navigate("Create An Exam");
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to upload exam questions
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function uploadExamQuestions() {
        fetch('http://192.168.0.147:30000/uploadQuestions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({examID: subject, examDate: examD, qOne: questionOne, qTwo: questionTwo, qThree: questionThree, qFour: questionFour, qFive: questionFive})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message == 'true') alert("Exam questions submitted!"); else alert('Question submission failed!'); })
        .catch((err) => { alert(err); });
    }

    //Function to check if the first question's text box is empty and if not, return true else return true
    function validateQuestions() {
        if (questionOne == '')
            return false;
        return true;
    }

    //Function to validate the questions entered, upload the questions and navigate to the next page else an alert
    //is issued
    function combined() {
        if (validateQuestions()) {
            uploadExamQuestions();
            navigateToCreateEditExam();
        }
        else {
            alert("You must fill in the first question at the very least!");
        }
    }

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToCreateAnExam} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

             {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Create exam Questions</Text>
            </View>

            {/*View/flexbox for the form to be filled to add exam questions*/}
            <View style={styles.inputs}>
                <View style={styles.questionOne}>
                    <Text style={styles.inputLabel}>QUESTION-1*</Text>
                    <TextInput onChangeText={questionOne => setQuestionOne(questionOne)} defaultValue={questionOne} placeholder="Type in the first question" style={styles.input} />
                </View>

                <View style={styles.questionTwo}>
                    <Text style={styles.inputLabel}>QUESTION-2</Text>
                    <TextInput onChangeText={questionTwo => setQuestionTwo(questionTwo)} defaultValue={questionTwo} placeholder="Type in the second question" style={styles.input} />
                </View>

                <View style={styles.questionThree}>
                    <Text style={styles.inputLabel}>QUESTION-3</Text>
                    <TextInput onChangeText={questionThree => setQuestionThree(questionThree)} defaultValue={questionThree} placeholder="Type in the third question" style={styles.input} />
                </View>

                <View style={styles.questionFour}>
                    <Text style={styles.inputLabel}>QUESTION-4</Text>
                    <TextInput onChangeText={questionFour => setQuestionFour(questionFour)} defaultValue={questionFour} placeholder="Type in the fourth question" style={styles.input} />
                </View>

                <View style={styles.questionFive}>
                    <Text style={styles.inputLabel}>QUESTION-5</Text>
                    <TextInput onChangeText={questionFive => setQuestionFive(questionFive)} defaultValue={questionFive} placeholder="Type in the fifth question" style={styles.input} />
                </View>

                <TouchableOpacity onPress={combined} style={styles.finishExamButton}>
                    <Text style={styles.finishExamButtonText}>Finish Exam</Text>
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
    questionOne: {

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