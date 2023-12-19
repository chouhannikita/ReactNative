import React, { useEffect } from 'react'
import { View } from 'react-native'

const Logout = (props) => {
    useEffect(()=>{
       props.navigation.navigate('Sign In')
    })
  return (
    <View>
    
    </View>
  )
}

export default Logout