import React,{useEffect, useState} from 'react'
import { View,TextInput,Text,TouchableOpacity,Pressable,StyleSheet, Image } from 'react-native'
import { BASE_API_URL } from '../utils/constants';
import axios from 'axios';
import AntDesign from "react-native-vector-icons/AntDesign"
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ScrollView } from 'react-native-gesture-handler';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErr] = useState({});
  const [user,setUser] = useState([])
  const [message,setMessage] = useState("")
  const [login,setLogin] = useState(false)
  useEffect(()=>{
    GoogleSignin.configure()
   try{
      axios.get(`${BASE_API_URL}/user`).then((res)=>{
        setUser(res.data)
      })
    }catch(err){
      console.log(err)
     }
  },[])

  const signIn = async () => {
    console.log("signin")
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo,"userinfo")
      setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error)
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleValid = () => {
    let err = {};
    const emailErr = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (email === '') {
      err.email = 'Enter your email';
    }
     else {
      err.email = '';
    }
   if(!email.match(emailErr)){
    console.log("kfnjh")
      err.email = "Please enter valid email"
   }
    if (password === '') {
      err.password = 'Enter your password';
    } else {
      err.password = '';
    }
    setErr(err);
    let valid = true;
    Object.values(err).forEach(val => {
      val.length > 0 && (valid = false);
    });
    return valid;
  };

   const handleSubmit = ()=>{
    if(handleValid()){
     const loginData = user.filter((users) => users.email === email && users.password === password)
     if(loginData.length>0){
      setEmail("")
      setPassword("")
      setLogin(true)
      setMessage("Logged In Successfully") 
      setTimeout(()=>{
        props.navigation.navigate('Expense')
        setMessage("")

      })
     }
     else{
      setMessage("Invalid Credential")
      setLogin(false)
     }
    }
   }

  return (
    <ScrollView>
    <View style={style.signupBox}>
    <View style={style.header}>
      <Text style={{ color:'white', fontSize: 20, fontWeight: 'bold'}}>
        Sign In
      </Text>
    </View>
    <View>
    <Text style={{color: login ? 'green' : "red", marginLeft: 20, fontSize: 18}}>
        {message}
     </Text>
      <TextInput
        style={style.inputBox}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <Text style={{color: 'red', marginLeft: 20, fontSize: 18}}>
            {errmsg.email}
          </Text>
      <TextInput
        style={style.inputBox}
        secureTextEntry={true}
        placeholder="Enter Your Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Text style={{color: 'red', marginLeft: 20, fontSize: 18}}>
            {errmsg.password}
          </Text>
      <TouchableOpacity
        style={style.Btn}
        onPress={handleSubmit}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Sign In
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={style.signin}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Do not have an account ?
          <Pressable onPress={()=>props.navigation.navigate('SignUp')}>
            <Text style={{color: 'blue', fontSize: 20}}>Sign Up</Text>
          </Pressable>
        </Text>
      </View>
      <TouchableOpacity
      style={style.googleBtnBtn}
        onPress={signIn}
        >
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            google
          </Text>
          {/* <AntDesign name = "google" color="red" size={30}/> */}
          <Image source={require('./images/google.png')}/>
        </View>
      </TouchableOpacity>
    </View>
  </View>
  </ScrollView>
  )
}
const style = StyleSheet.create({
  signupBox: {
    flex: 1,
    height : 600,
    width: '90%',
    elevation: 10,
    backgroundColor: 'white',
    margin: 20,
    marginTop: 50,
  },
  header: {
    height: 70,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 40,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
  },
  Btn: {
    height: 60,
    width: 160,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 90,
    marginTop: 30,
    borderRadius: 10,
  },
  signin: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  googleBtn : {
    marginLeft : 20
  }
});
export default Login