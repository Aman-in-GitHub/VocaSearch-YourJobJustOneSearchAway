import React, {useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';

const Starter = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#2451f1" />
      <View className="flex h-screen bg-[#2451f1] items-center justify-center">
        <Text className="text-white font-bold text-5xl">VocaSearch</Text>
        <Text
          className="text-white text-[20px] font-bold mt-1"
          style={{fontFamily: 'cursive'}}>
          One Search Away
        </Text>
      </View>
    </>
  );
};

export default Starter;
