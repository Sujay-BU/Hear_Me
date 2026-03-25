import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page CreateEditExam.js
export default function CreateEditExam(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ProfessorLoggedIn.js
    function navigateToProfessorsLoggedIn() {
        navigation.navigate("Professor Logged In");
    }

    ////Function to navigate to the page CreateAnExam.js
    function navigateToCreateAnExam() {
        navigation.navigate("Create An Exam");
    }

    //Function to navigate to the page EditAnExam.js
    function navigateToEditAnExam() {
        navigation.navigate("Edit An Exam");
    }

    //Function to navigate to the page DeleteAnExamjs
    function navigateToDeleteAnExam() {
        navigation.navigate("Delete An Exam");
    }

    //Function to navigate to the page ViewAnExam.js
    function navigateToViewAnExam() {
        navigation.navigate("View An Exam");
    }

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
             {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToProfessorsLoggedIn} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Create/Edit an exam</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox for the different buttons*/}
            <View>
                <TouchableOpacity onPress={navigateToCreateAnExam} style={styles.createExamButton}>
                    <Text style={styles.createExamButtonText}>Create an exam</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToEditAnExam} style={styles.editExamButton}>
                    <Text style={styles.createExamButtonText}>Edit an Exam</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToDeleteAnExam} style={styles.editExamButton}>
                    <Text style={styles.createExamButtonText}>Delete an exam</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToViewAnExam} style={styles.editExamButton}>
                    <Text style={styles.createExamButtonText}>View an Exam</Text>
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
});