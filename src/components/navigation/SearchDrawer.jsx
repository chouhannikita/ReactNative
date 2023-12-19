import 'react-native-gesture-handler';
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ShowExpense from '../expense/ShowExpense'
import { ExpenseSearchDesc, ExpenseSearchOrder, ExpenseSearchYear, TypeSearch } from '../expense/ExpenseFilter';

const Drawer = createDrawerNavigator()

const SearchDrawerTab = () => {
  return (
    <Drawer.Navigator screenOptions={{
      drawerLabelStyle : {
        fontSize :  23,
        color : "#2f4f4f"
      },
    }}>
      <Drawer.Screen name='All Expense' component={ShowExpense}/>
      <Drawer.Screen name='Search ExpenseType' component={TypeSearch}/>
      <Drawer.Screen name='Sort By' component={ExpenseSearchOrder}/>
      <Drawer.Screen name="Search by Year" component={ExpenseSearchYear}/>
      <Drawer.Screen name='search by description' component={ExpenseSearchDesc}/>
      
    </Drawer.Navigator>
  )
}

export default SearchDrawerTab