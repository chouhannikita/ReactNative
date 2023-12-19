
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './src/components/Signup';
import BottomTab from './src/components/navigation/BottomTab';
import Login from './src/components/Login';
import { requestUserPermission ,notificationListener} from './src/utils/notificationServices';
const Stack = createStackNavigator()

function App() {
  useEffect(()=>{
    requestUserPermission()
    notificationListener()
  },[])
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen name='Sign In' component={Login}/>
       <Stack.Screen name='SignUp' component={Signup}/>
       <Stack.Screen name='Expense' component={BottomTab}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
