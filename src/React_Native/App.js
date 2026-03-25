import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importing the required functions/renders from different files
import LoginPageProfessors from './pages/ProfessorsLoginPage';
import LoginPageOptions from './pages/LoginOptions';
import LoginPageStudents from './pages/StudentsLoginPage';
import ProfessorLogin from './pages/ProfessorsLogin';
import ProfessorSignUp from './pages/ProfessorsSignUp';
import ForgotPasswordOne from './pages/ForgotPasswordOne';
import ForgotPasswordTwo from './pages/ForgotPasswordTwo';
import ForgotPasswordThree from './pages/ForgotPasswordThree';
import ForgotPasswordFour from './pages/ForgotPasswordFour';
import ProfessorLoggedIn from './pages/ProfessorLoggedIn'
import StudentLoggedIn from './pages/StudentLoggedIn'
import CreateEditExam from './pages/CreateEditExam'
import CreateAnExam from './pages/CreateAnExam'
import ExamQuestions from './pages/ExamQuestions'
import EditAnExam from './pages/EditAnExam'
import DeleteAnExam from './pages/DeleteAnExam'
import ViewAnExam from './pages/ViewAnExam'
import ViewExam from './pages/ViewExam'
import StudentSelectorMarks from './pages/StudentSelectorMarks'
import StudentSubjectSelectorMarks from './pages/StudentSubjectSelectorMarks'
import GradeEntry from './pages/GradeEntry'
import StudentCallSelector from './pages/StudentCallSelector'
import ViewMarksStudent from './pages/ViewMarksStudent'

//Creating a stack navigator constant
const Stack = createStackNavigator();

//Function that takes care of navigation alone
export default function App() {
  return (
    //Creating a navigation container element
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login Options" component={LoginPageOptions} />
        <Stack.Screen name="Professors Login Page" component={LoginPageProfessors} />
        <Stack.Screen name="Students Login Page" component={LoginPageStudents} options={{gestureEnabled: false}} />
        <Stack.Screen name="Professors Login" component={ProfessorLogin} />
        <Stack.Screen name="Professors Signup" component={ProfessorSignUp} />
        <Stack.Screen name="Professors Forgot Password One" component={ForgotPasswordOne} />
        <Stack.Screen name="Professors Forgot Password Two" component={ForgotPasswordTwo} />
        <Stack.Screen name="Professors Forgot Password Three" component={ForgotPasswordThree} options={{gestureEnabled: false}} />
        <Stack.Screen name="Professors Forgot Password Four" component={ForgotPasswordFour} options={{gestureEnabled: false}} />
        <Stack.Screen name="Professor Logged In" component={ProfessorLoggedIn} options={{gestureEnabled: false}} />
        <Stack.Screen name="Student Logged In" component={StudentLoggedIn} options={{gestureEnabled: false}} />
        <Stack.Screen name="Create Edit Exam" component={CreateEditExam} />
        <Stack.Screen name="Create An Exam" component={CreateAnExam} />
        <Stack.Screen name="Exam Questions" component={ExamQuestions} />
        <Stack.Screen name="Edit An Exam" component={EditAnExam} />
        <Stack.Screen name="Delete An Exam" component={DeleteAnExam} />
        <Stack.Screen name="View An Exam" component={ViewAnExam} />
        <Stack.Screen name="View Exam" component={ViewExam} />
        <Stack.Screen name="Student Selector Marks" component={StudentSelectorMarks} />
        <Stack.Screen name="Student Subject Selector Marks" component={StudentSubjectSelectorMarks} />
        <Stack.Screen name="Grade Entry" component={GradeEntry} />
        <Stack.Screen name="Student Call Selector" component={StudentCallSelector} />
        <Stack.Screen name="View Marks Student" component={ViewMarksStudent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* <StatusBar style="auto" /> */