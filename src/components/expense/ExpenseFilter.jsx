import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Searchbar, Text, RadioButton} from 'react-native-paper';
import axios from 'axios';
import {BASE_API_URL} from '../../utils/constants';
import ShowExpense from './ShowExpense';
import SelectDropdown from 'react-native-select-dropdown';

 export const ExpenseSearchDesc = props => {
  const [descSearch, setdescSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${BASE_API_URL}/expenses`).then(res => {
        setData(res.data);
        setSearchData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDesc = () => {
    const newdata = data.filter(item => item.desc === descSearch);
    setSearchData(newdata);
    setdescSearch('');
  };
  
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 20,
          flexDirection: 'row',
          position: 'fixed',
        }}>
        <Searchbar
          placeholder="search here"
          value={descSearch}
          onChangeText={desc => setdescSearch(desc)}
          style={{flex: 1}}
        />
        <Pressable style={style.descBtn}>
          <Text style={{color: 'white', fontSize: 15}} onPress={handleDesc}>
            Search
          </Text>
        </Pressable>
      </View>
      <View>
        <ShowExpense route={{params: {searchData: searchData}}} />
      </View>
    </ScrollView>
  );
};



// search by expense type
export const TypeSearch = ()=> {
  const [searchData, setSearchData] = useState([]);
  const [checked, setChecked] = useState('card');
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${BASE_API_URL}/expenses`).then(res => {
        setData(res.data);
        setSearchData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleTypesearch = useCallback((check) => {
    const newdata = data.filter(item => item.type === check);
    setSearchData(newdata);
  },[checked])

  const handleChecked = () => {
    setChecked('cash');
    handleTypesearch('cash'); 
  }
  const handleCheckedCard = () => {
    setChecked('card');
    handleTypesearch('card'); 
  }
   return(
    <>
  <View style={{marginTop: 30}}>
  <Text style={style.expenseHead}>Expense Type</Text>
  <TextInput
    style={style.inputBox}
    placeholder="Expense Type"
    value={checked}
    onChangeText={value => setChecked(value)}
  />

  <View style={{flexDirection: 'row', marginLeft: 30}}>
    <RadioButton
      value="card"
      status={checked === 'card' ? 'checked' : 'unchecked'}
      onPress={() =>handleCheckedCard()}
    />
    <Text style={style.expenseOption}>Card</Text>
    <RadioButton
      value="cash"
      status={checked === 'cash' ? 'checked' : 'unchecked'}
      onPress={()=> handleChecked()}
    />
    <Text style={style.expenseOption}>Cash</Text>
  </View>
  <View>
        <ShowExpense route={{params: {searchData: searchData}}} />
    </View>
</View>
</>
   )
}

// Sort in ASC AND DESC
export const ExpenseSearchOrder = ()=>{
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${BASE_API_URL}/expenses`).then(res => {
        setData(res.data);
        setSearchData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSort = sortby => {
    let newData = [...data];

    if (sortby === 'Newest first') {
      newData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      newData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setSearchData(newData);
  };

  return(
     <ScrollView>
      <View style={{marginLeft: 20, flexDirection: 'row', marginTop: 20}}>
        <Text style={[style.expenseHead, {marginTop: 10, marginRight: 10}]}>
          Sort by
        </Text>
        <SelectDropdown
          data={['Newest first', 'Oldest first']}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{backgroundColor: 'grey', marginLeft: 20}}
          buttonTextStyle={{fontSize: 20, color: 'white'}}
          onSelect={item => handleSort(item)}
        />
      </View>
      <View>
        <ShowExpense route={{params: {searchData: searchData}}} />
      </View>
     </ScrollView>
  )
}
// search by year
export const ExpenseSearchYear = ()=>{
  const [searchData, setSearchData] = useState([]);
  const [data, setData] = useState([]);
  const year = ['current', 'previous'];
  useEffect(() => {
    try {
      axios.get(`${BASE_API_URL}/expenses`).then(res => {
        setData(res.data);
        setSearchData(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleYearSearch = year => {
    const newDate = new Date();
    let newData = [];
    const currentYear = newDate.getFullYear();
    if (year === 'current') {
      newData = data.filter(
        item => new Date(item.date).getFullYear() === currentYear,
      );
      setSearchData(newData);
    } else {
      newData = data.filter(
        item => new Date(item.date).getFullYear() !== currentYear,
      );
      setSearchData(newData);
    }
  };
  return(
    <ScrollView>
      <View style={{marginLeft: 20, flexDirection: 'row', marginTop: 20}}>
        <Text style={[style.expenseHead, {marginTop: 10, marginRight: 10}]}>
          Search Year
        </Text>
        <SelectDropdown
          data={year}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{backgroundColor: 'grey', marginLeft: 20}}
          buttonTextStyle={{fontSize: 20, color: 'white'}}
          onSelect={item => handleYearSearch(item)}
        />
      </View>
      <View>
        <ShowExpense route={{params: {searchData: searchData}}} />
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  descBtn: {
    height: 50,
    width: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    height: 40,
    borderWidth: 1,
    marginHorizontal: 20,
    // marginTop: 30,
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
  },
  expenseHead: {
    marginLeft: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  expenseOption: {
    marginTop: 5,
    fontSize: 20,
    marginRight: 20,
  },
});