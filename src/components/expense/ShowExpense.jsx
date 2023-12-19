import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import {Card} from 'react-native-paper';
import {BASE_API_URL} from '../../utils/constants';
import {RadioButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';

const ShowExpense = props => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState('card');
  const [exAmount, setExAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const {route} = props;
  useEffect(() => {

    if (route.params !== undefined) {
      setData(route.params.searchData);
    } else {
      try {
      axios.get(`${BASE_API_URL}/expenses`).then(res => {
          setData(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [data, route]);

  const handleDelete = async id => {
    try {
      await axios.delete(`${BASE_API_URL}/expenses/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = index => {
    console.log(index);
    setEdit(true);
    const editData = data[index];
    setChecked(editData.type);
    setExAmount(editData.amount);
    setDesc(editData.desc);
    setEditIndex(editData.id);
    setDate(date);
  };
  const handleSubmit = async () => {
    const newdata = {
      type: checked,
      amount: exAmount,
      desc: desc,
      date: date,
    };
    try {
      await axios.patch(`${BASE_API_URL}/expenses/${editIndex}`, newdata);
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      {/* show data */}

      <View>
        { data.length>0 ? data.map((val, index) => {
          return (
            <Card style={styles.Card} key={index}>
              <Card.Content>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {color: 'black'}]}>
                    Expense Type -{' '}
                  </Text>
                  <Text style={styles.valText}>{val.type}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={styles.text}>Expense Amount - </Text>
                  <Text style={styles.valText}>{val.amount}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={styles.text}>Description - </Text>
                  <Text style={styles.valText}>{val.desc}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={styles.text}>Date - </Text>
                  <Text style={styles.valText}>
                    {new Date(val.date).toLocaleDateString('en-US')}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions style={{flexDirection: 'row',marginRight : 20}}>
                <TouchableOpacity onPress={() => handleUpdate(index)}>
                  <View style={styles.Btn}>
                    <Text style={{color: 'white', fontSize: 22}}>Update</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(val.id)}>
                  <View style={[styles.Btn, {backgroundColor: '#dc143c'}]}>
                    <Text style={{color: 'white', fontSize: 22}}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          );
        }) :
        <View>
          <Image source={require('../images/not_found.png')} style={styles.Nodataimgae}/>
        </View>}
      </View>

      {/* update form start */}

      <View style={styles.box}>
          <Modal
            visible={edit}
            transparent={false}
            onBackButtonPress={() => setEdit(false)}
            animationType="slide">
            <View style={styles.modal}>
              <ScrollView>
                <View style={styles.addBox}>
                    <View style={{marginTop: 30}}>
                      <Text style={styles.expenseHead}>Expense Type</Text>
                      <TextInput
                        style={styles.inputBox}
                        placeholder="Expense Type"
                        value={checked}
                        onChangeText={() => setChecked(checked)}
                      />

                      <View style={{flexDirection: 'row', marginLeft: 30}}>
                        <RadioButton
                          value="card"
                          status={checked === 'card' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('card')}
                        />
                        <Text style={styles.expenseOption}>Card</Text>
                        <RadioButton
                          value="cash"
                          status={checked === 'cash' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('cash')}
                        />
                        <Text style={styles.expenseOption}>Cash</Text>
                      </View>
                    </View>

                    <View style={{marginTop: 30}}>
                      <Text style={styles.expenseHead}>Expense Amount</Text>
                      <TextInput
                        style={styles.inputBox}
                        placeholder="Enter Expense amount"
                        value={exAmount}
                        onChangeText={amount => setExAmount(amount)}
                      />
                    </View>
                    <View style={{marginTop: 30}}>
                     <Text style={styles.expenseHead}>Date</Text>

                      <Pressable onPress={() => setModalVisible(true)}>
                        <Text style={styles.inputBox}>
                         {new Date(date).toLocaleDateString('en-US')}
                        </Text>
                      </Pressable>
                      <Modal
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                          setModalVisible(!modalVisible);
                        }}>
                        <View
                          style={{
                            marginTop: 150,
                            marginHorizontal: 20,
                            elevation: 10,
                            backgroundColor: 'white',
                            padding: 20,
                          }}>
                          <View style={{marginLeft: 20}}>
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
                                style={[styles.modaBtn,{backgroundColor : "#00008b"}]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>submit</Text>
                              </Pressable>
                              <Pressable
                                style={[styles.modaBtn,{backgroundColor : "rgb(205, 6, 6)"}]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>cancel</Text>
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </Modal>
                    </View>
                    <View style={{marginTop: 30}}>
                      <Text style={styles.expenseHead}>Description</Text>
                      <TextInput
                        style={styles.inputBox}
                        placeholder="Enter description"
                        value={desc}
                        onChangeText={desc => setDesc(desc)}
                      />
                    </View>

                    <TouchableOpacity
                      style={[styles.Btn, {marginLeft: 120}]}
                      onPress={handleSubmit}>
                      <View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                          }}>
                          Update
                        </Text>
                      </View>
                    </TouchableOpacity>
                
                </View>
              </ScrollView>
            </View>
          </Modal>
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 21,
    marginHorizontal: 20,
    fontWeight: "bold",
    color: 'black',
    letterSpacing : 1,
    lineHeight : 35
  },
  Card: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'white',
    elevation: 10,
  },
  valText: {
    fontSize: 22,
    color: "black",
    letterSpacing : 2
  },
  Btn: {
    backgroundColor: '#00008b',
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
  
  },

  modal: {
    height: 550,
    width: '90%',
    borderRadius: 7,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 20,
    marginTop: 100,
    marginHorizontal: 20,
    position: 'absolute',
    flex: 1,
  },

  header: {
    height: 70,
    backgroundColor: 'orange',
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modaBtn : {
    marginLeft: 10,
    height: 40,
    fontSize: 30,
    width: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Nodataimgae : {
   width : 350,
   height : 350,
   marginHorizontal :20,
   marginTop : 50,
   flex : 1
  }
});

export default ShowExpense;
