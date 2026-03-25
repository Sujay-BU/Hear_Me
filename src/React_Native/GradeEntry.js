import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page GradeEntry.js and recieves some data from the previous
//page StudentSubjectSelectorMarks.js in json format through the object route
export default function GradeEntry({route}){

    //Assigning variables values of the parameters passed from the previous page
    const {studID, subject} = route.params;

    //Creating a state hook/variable whose default value is an empty string
    const [grades, setGrades] = useState('');

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page StudentSubjectSelectorMarks.js
    function navigateToStudentSubjectSelectorMarks() {
        navigation.navigate("Student Subject Selector Marks");
    }

    //Function that performs a fetch operation using the post method to communicate with the express backend
    //in a json format and henceforth with the database as seen in the file app.js to upload grades for a student
    //The response sent by the express server is then jsonified and dealt with appropriately or throw an error if
    //an error is thrown
    function uploadGrades() {
        fetch('http://192.168.0.147:30000/uploadGrades', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({studentID: studID, subjectID: subject, grade: grades})
        })
        .then((response) => response.json())
        .then((responseData) => { if(responseData.message != 'false') {alert("Grade uploaded sucessfully!"); navigation.navigate("Student Subject Selector Marks");} else alert('Unable to upload grade!'); })
        .catch((err) => { alert(err); });
    }

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToStudentSubjectSelectorMarks} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Grade Entry</Text>
            </View>

            {/*View/flexbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

             {/*View/flexbox for the form to be filled to upload a grade and an upload marks button*/}
            <View>
                <View style={styles.examDateInput}>
                    <Text style={styles.inputLabel}>GRADE* (HD, D, C, P, F)</Text>
                    <TextInput onChangeText={grades => setGrades(grades)} defaultValue={grades} placeholder="Type in the grade" style={styles.input} />
                </View>

                <TouchableOpacity onPress={uploadGrades} style={styles.callButton}>
                    <Text style={styles.examButtonText}>Upload marks</Text>
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
        width: 250,
        height: 350,
        marginLeft: 30,
        marginTop: 20,
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
    examButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 25,
    },
    examButtonText: {
        fontSize: 35,
        fontFamily: "Copperplate",
        textAlign: "center",
    },
    marksButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 3,
        marginRight: 5,
        marginTop: 16,
    },
    callButton: {
        padding: 20,
        backgroundColor: '#fffdd0',
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 5,
        marginTop: 25,
        marginRight: 20,
    },
    examDateInput: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
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
});