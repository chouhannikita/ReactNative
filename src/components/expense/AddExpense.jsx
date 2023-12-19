import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_API_URL} from '../../utils/constants';
import DatePicker from 'react-native-date-picker';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
const AddExpense = props => {
  const [checked, setChecked] = React.useState('card');
  const [date, setDate] = useState(new Date());
  const [exAmount, setExAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [errmsg, setErr] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [message,setMessage] = useState("")
  const [login,setLogin] = useState(false)

  const {route} = props;

  const handleValid = () => {
    let err = {};
    if (exAmount === '') {
      err.amount = 'enter expense amount';
    } else {
      err.amount = '';
    }
    if (desc === '') {
      err.desc = 'enter expense description';
    } else {
      err.desc = '';
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
      type: checked,
      amount: exAmount,
      desc: desc,
      date: date,
    };
    if (handleValid()) {
      try {
        axios.post(`${BASE_API_URL}/expenses`, data);
        props.navigation.navigate('Show Expense');
        setExAmount('');
        setDesc('');
        setLogin(true)
        setMessage("Added Successfully")
        setTimeout(()=>{
          setMessage("")
          props.navigation.navigate('Show Expense');

        },2000)
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <ScrollView>
      <ScrollView style={style.addBox}>
        <View style={style.header}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            Add Expense
          </Text>
        </View>
        <View>
        <Text style={{color: login ? 'green' : "red", marginLeft: 20, fontSize: 18}}>
        {message}
     </Text>
          <View style={{marginTop: 10}}>
            <Text style={style.expenseHead}>Expense Type</Text>
            <TextInput
              style={style.inputBox}
              placeholder="Expense Type"
              value={checked}
            />

            <View style={{flexDirection: 'row', marginLeft: 30}}>
              <RadioButton
                value="card"
                status={checked === 'card' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('card')}
              />
              <Text style={style.expenseOption}>Card</Text>
              <RadioButton
                value="cash"
                status={checked === 'cash' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('cash')}
              />
              <Text style={style.expenseOption}>Cash</Text>
            </View>
          </View>

          <View>
            <Text style={style.expenseHead}>Expense Amount</Text>
            <TextInput
              style={style.inputBox}
              placeholder="Enter Expense amount"
              value={exAmount}
              onChangeText={amount => setExAmount(amount)}
            />
            <Text style={[style.expenseHead, {color: 'red'}]}>
              {errmsg.amount}
            </Text>
          </View>

          <View style={{marginTop: 1}}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={style.inputBox}>
                Date : -{' '}
                {new Date(date).toLocaleDateString("en-US")}
              </Text>
            </Pressable>
            <Modal
              animationType="slide"
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <DatePicker
                    date={date}
                    mode="date"
                    format="DD/MM/YYYY"
                    minDate="01-01-1900"
                    maxDate="01-01-2000"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={date => {
                      setDate(date);
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <Pressable
                      style={[style.button, style.buttonClose, {width: 80}]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={style.textStyle}>submit</Text>
                    </Pressable>
                    <Pressable
                      style={{
                        marginLeft: 10,
                        backgroundColor: 'red',
                        height: 40,
                        fontSize: 30,
                        width: 80,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={style.textStyle}>cancel</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{marginTop: 30}}>
            <Text style={style.expenseHead}>Description</Text>
            <TextInput
              style={style.inputBox}
              placeholder="Enter description"
              value={desc}
              onChangeText={desc => setDesc(desc)}
            />
            <Text style={[style.expenseHead, {color: 'red'}]}>
              {errmsg.desc}
            </Text>
          </View>

          <TouchableOpacity style={style.Btn} onPress={handleSubmit}>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                Add Expense
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  addBox: {
    flex: 1,
    height: 600,
    width: '90%',
    elevation: 10,
    backgroundColor: 'white',
    margin: 20,
    marginTop: 30,
  },
  header: {
    height: 70,
    backgroundColor: '#00008b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 40,
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
  },
  Btn: {
    height: 60,
    width: 160,
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 90,
    marginBottom: 10,
    borderRadius: 10,
  },
  expenseOption: {
    marginTop: 5,
    fontSize: 20,
    marginRight: 20,
  },
  expenseHead: {
    marginLeft: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
export default AddExpense;
