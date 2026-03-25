import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
/* import { TextInput } from 'react-native-gesture-handler'; */

//Function that takes care of the creation of the  page LoginPageStudents.js
export default function LoginPageStudents(){

    //Creating a navigation constant to be able to move to different pages of the app
    const navigation = useNavigation();

    //Function to navigate to the page LoginOptions.js
    function navigateToLoginOptionsPage() {
        navigation.navigate("Login Options");
    }

    //Function to navigate to the page StudentLoggedIn.js
    function navigateToStudentLoggedIn() {
        navigation.navigate("Student Logged In");
    }

    //Function that speaks some sentences as defined below
    function speakLocation() {
        const thingToSay = "This is the students login portal. Press anywhere on the bottom half of the screen to take a picture.";
        Speech.speak(thingToSay);
    }
    //Calling the above function
    speakLocation();

    //Function that speaks some sentences as defined below
    function speakAuthenticationSuccess() {
        const thingToSay = "You are now logged in.";
        Speech.speak(thingToSay);
    }

    //Function that speaks some sentences as defined below
    function speakAuthenticationFailure() {
        const thingToSay = "We failed to authorize you, please take a better picture.";
        Speech.speak(thingToSay);
    }

    //Anonymous async function that asks the user for permission to use their camera
    const askForPermission = async () => {
        const permissionResult = 
        await Permissions.askAsync(Permissions.CAMERA)
        if (permissionResult.status !== 'granted') {
          alert('no permissions to access camera!', 
          [{ text: 'ok'}])
          return false;
        }
        return true;
    }

    //Anonymous async function that takes an image using the camera, allows cropping of the picture, is of the
    //aspect ratio 3:3, converts the image to base64, makes sure the image was taken, if so performs a backend
    //call to the python server which validates the picture taken and speaks of the success or failure of the
    //verification process
    let takeImage = async () => {
		// make sure that we have the permission
		const hasPermission = await askForPermission()
		if (!hasPermission) {
			return
		} else {
			// launch the camera with the following settings
			let image = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 1,
				base64: true,
			})
			// make sure a image was taken:
			if (!image.cancelled) {
				fetch('http://192.168.0.147:30001/json-example', {
					method: 'POST',
					headers: {
                        'Content-Type': 'application/json',
					},
					// send our base64 string as POST request
					body: JSON.stringify({imgsource: image.base64}),
				})
                .then((response) => response.json())
                .then((responseData) => { if(responseData.message == 'true') {speakAuthenticationSuccess(); navigateToStudentLoggedIn();} else {speakAuthenticationFailure(); alert('Failed to login!');} })
                .catch((err) => { alert(err); });
			}
		}
	}

    //Core of the page, contains all the react native tags
    return(
        <View style={styles.wholePage}>
            {/*View/flexbox for the back button and the text of the back button*/}
            <View style={styles.backButtonView}>
                <TouchableOpacity onPress={navigateToLoginOptionsPage} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {/*View/felxbox for the heading of the page*/}
            <View style={styles.heading}>
                <Text style={styles.headingText}>Hear Me For Students:   Login</Text>
            </View>

            {/*View/felxbox for the picture of the logo of the app*/}
            <View>
                <Image source={{uri: 'Logo.jpeg'}} style={styles.imageStyle} />
            </View>

            {/*View/Flexbox that contains the button to take a picture*/}
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={takeImage} style={styles.pictureButton}>
                    <Text style={styles.picText}>Take a Picture!</Text>
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
});