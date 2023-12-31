import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../../Redux/Actions/UserAction';

var {width} = Dimensions.get('window');

export default function ForgotPassword({navigation}) {
  const {loading, error, message} = useSelector(state => state.forgotPassword);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const forGotPassword = () => {
    dispatch(forgotPassword(username));
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (message) {
      alert(message);
    }
  }, [alert, error, message]);

  return (
    <>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.container}>
          <TextInput
            placeholder="Write your email..."
            placeholderTextColor="#333"
            style={styles.forgot}
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity onPress={forGotPassword} style={styles.button}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 1,
    height: width * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    width: width * 1 - 80,
    height: 50,
    borderColor: '#3BB77E',
    borderWidth: 1,
    color: '#333',
    borderRadius: 10,
    paddingLeft: 15,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#3BB77E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
