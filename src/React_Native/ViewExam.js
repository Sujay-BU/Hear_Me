import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Function that takes care of the creation of the  page ViewExam.js and recieves some data from the previous
//page in json format through the route object
export default function ViewExam({route}) {

    //Assigning some variables to the parameters passed to this page through the route object
    const {examID, examDate, qOne, qTwo, qThree, qFour, qFive} = route.params;

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page ViewAnExam.js
    function navigateToViewAnExam() {
        navigation.navigate("View An Exam");
    }

    //Core of the page, contains all the react native tags
    return(
        <ScrollView style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToViewAnExam} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>{examID}'s Exam,</Text>
                <Text style={styles.headingText}>ON {examDate}:</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/flexbox that contains the text boxes that contain questions*/}
            <View style={styles.inputs}>
                <View style={styles.questionOne}>
                    <Text style={styles.label}>QUESTION ONE:</Text>
                    <Text style={styles.questions}>{qOne}</Text>
                </View>

                <View style={styles.questionView}>
                    <Text style={styles.label}>QUESTION TWO:</Text>
                    <Text style={styles.questions}>{qTwo}</Text>
                </View>

                <View style={styles.questionView}>
                    <Text style={styles.label}>QUESTION THREE:</Text>
                    <Text style={styles.questions}>{qThree}</Text>
                </View>

                <View style={styles.questionView}>
                    <Text style={styles.label}>QUESTION FOUR:</Text>
                    <Text style={styles.questions}>{qFour}</Text>
                </View>

                <View style={styles.questionView}>
                    <Text style={styles.label}>QUESTION FIVE:</Text>
                    <Text style={styles.questions}>{qFive}</Text>
                </View>
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
    questionOne: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 20,
        borderColor: 'grey',
    },
    questionView: {
        marginTop: 38,
        padding: 10,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 2,
    },
    label: {
        color: 'black',
        fontSize: 20,
        textDecorationLine: 'underline',
    },
    questions: {
        color: 'black',
        fontSize: 25,
        marginTop: 10,
    },
});