import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ProfessorLoggedIn.js
export default function ProfessorLoggedIn(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorsLogin.js
    function navigateToProfessorsLogin() {
        navigation.navigate("Professors Login");
    }

    //Function to navigate to the page CreateEditExam.js
    function navigateToCreateEditExam(){
        navigation.navigate("Create Edit Exam");
    }

    //Function to navigate to the page StudentSelectorMarks.js
    function navigateToStudentSelectorMarks() {
        navigation.navigate("Student Selector Marks");
    }

    //Function to navigate to the page StudentCallSelector.js
    function navigateToStudentCallSelector() {
        navigation.navigate("Student Call Selector");
    }

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToProfessorsLogin} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Welcome Dr.Sujayanand!</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app and the create exam button*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox that contains navigation buttons*/}
            <View>
                <TouchableOpacity onPress={navigateToCreateEditExam} style={styles.examButton}>
                    <Text style={styles.examButtonText}>Exam portal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToStudentSelectorMarks} style={styles.marksButton}>
                    <Text style={styles.examButtonText}>Upload marks</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToStudentCallSelector} style={styles.callButton}>
                    <Text style={styles.examButtonText}>Calls</Text>
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
        marginLeft: 3,
        marginRight: 5,
        marginTop: 16,
    },
});