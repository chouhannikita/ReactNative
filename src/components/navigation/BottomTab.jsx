import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddExpense from '../expense/AddExpense'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from "react-native-vector-icons/Ionicons"
import SearchDrawerTab from './SearchDrawer'
import Logout from '../Logout'
const Tab = createBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarLabel:""}}>
        <Tab.Screen name='Add' component={AddExpense} 
        options={{
          tabBarIcon : ()=>
            <Ionicons name="add-circle" color="black" size={35} />  
        }}
        />
        <Tab.Screen name="Show Expense" component={SearchDrawerTab}
        options={{
          tabBarIcon : ()=>
          <Ionicons name ="list-circle" color="black" size={35}/>
        }}
        />
          <Tab.Screen name="Logout" component={Logout}
        options={{
          tabBarIcon : ()=>
          <MaterialCommunityIcons name ="logout" color="black" size={35}/>
        }}
        />
    </Tab.Navigator>
  )
}

export default BottomTab