import React, {useState} from 'react';
import {BASE_API_URL} from '../utils/constants';
import axios from 'axios';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Signup = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErr] = useState({});
  const [message,setMessage] = useState("")
  const [login,setLogin] = useState(false)


  const handleValid = () => {
    let err = {};
    if (name === '') {
      err.name = 'Enter your name';
    } else {
      err.name = '';
    }
    if (email === '') {
      err.email = 'Enter your email';
    } else {
      err.email = '';
    }
    if (password === '') {
      err.password = 'Enter your password';
    } else if (password.length < 8) {
      err.password = 'password contain 8 characters';
    } else {
      err.password = '';
    }
    setErr(err);
    let valid = true;
    Object.values(err).forEach(val => {
      val.length > 0 && (valid = false);
    });
    console.log(valid);
    return valid;
  };
  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    if (handleValid()) {
      try {
        axios.post(`${BASE_API_URL}/user`, data);
        setName('');
        setPassword('');
        setEmail('');
        setLogin(true)
        setMessage("Signup Successfully") 
        setTimeout(()=>{
          props.navigation.navigate('Expense');
          setMessage("") 
        })

      } catch (err) {
        console.log(err);
        setMessage("Try again")
        setLogin(false)
      } 

    }
  };
  return (
    <ScrollView>
      <View style={style.signupBox}>
        <View style={style.header}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Sign Up
          </Text>
        </View>
        <View>
        <Text style={{color: login ? 'green' : "red", marginLeft: 20, fontSize: 18}}>
        {message}
        </Text>
          <TextInput
            style={style.inputBox}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={name => setName(name)}
          />
          <Text style={{color: 'red', marginLeft: 20, fontSize: 18}}>
            {errmsg.name}
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
          
          <TouchableOpacity style={style.Btn} onPress={handleSubmit}>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Signu Up
              </Text>
            </View>
          </TouchableOpacity>
          <View style={style.signin}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Already have an account ?
              <Pressable onPress={()=>props.navigation.navigate('Sign In')}>
                <Text style={{color: 'blue', fontSize: 20}}>SignIn</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  signupBox: {
    flex: 1,
    height: 600,
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
});
export default Signup;
