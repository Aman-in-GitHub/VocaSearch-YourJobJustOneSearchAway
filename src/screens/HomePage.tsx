import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ForYou from '../components/ForYou';

export default function HomePage({navigation}) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [forYou, setForYou] = useState([]);
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobArr, setJobArr] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'API_KEY',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=4&num_pages=10`;

  useEffect(() => {
    const urlF = `https://jsearch.p.rapidapi.com/search?query=programminginnepal&page=1&num_pages=3`;

    async function getForYou() {
      setLoading(true);
      setStatus('');
      try {
        const response = await fetch(urlF, options);
        const result = await response.json();

        if (result.status) {
          setLoading(false);
        }
        if (result.data == '') {
          setForYou([]);
          setStatus('No jobs found :(');
          setLoading(false);
        } else {
          setForYou(result.data);
          setStatus('');
          setJobArr(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getForYou();
  }, []);

  useEffect(() => {
    if (value1 == '' && value2 == '') {
      setQuery('');
      setForYou(jobArr);
      setStatus('');
    }
  }, [value1, value2]);

  useEffect(() => {
    if (query) {
      async function getData() {
        setLoading(true);
        setStatus('');

        try {
          const response = await fetch(url, options);
          const result = await response.json();

          if (result.status) {
            setLoading(false);
          }
          if (result.data == '') {
            setForYou([]);
            setStatus('No jobs found :(');
            setLoading(false);
          } else {
            setForYou(result.data);
            setStatus('');
          }
        } catch (error) {
          console.error(error);
        }
      }
      getData();
    }
  }, [query]);

  function handleSubmit() {
    if (value1 == '' || value2 == '') return;
    setQuery(`${value1}jobsin${value2}`);
    Keyboard.dismiss();
  }

  return (
    <>
      <StatusBar backgroundColor="#0f1012" />
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="bg-[#0f1012] h-full">
            <View className="mx-3 flex gap-4 justify-center items-center">
              <View className="flex flex-row items-center gap-2">
                <Icon name="map-pin" size={23} color="white" />
                <TextInput
                  className="border-b border-white w-72 px-4 text-white text-[16px]  py-3"
                  placeholder="Ex. Nepal"
                  value={value2}
                  onChangeText={text => setValue2(text)}
                />
              </View>
              <View className="flex flex-row items-center gap-2">
                <Icon name="search" size={23} color="white" />
                <TextInput
                  className="border-b border-white w-72 px-4  text-white text-[16px] py-3"
                  placeholder="Python Developer"
                  value={value1}
                  onChangeText={text => setValue1(text)}
                />
              </View>
            </View>
            <View className="bg-white h-full mt-12 relative">
              <TouchableOpacity
                className="bg-[#2451f1] py-2 px-5 absolute top-[-25px] right-5"
                onPress={handleSubmit}>
                <Text className="text-white text-lg">Find Jobs</Text>
              </TouchableOpacity>

              {query == '' ? (
                <Text className="text-black text-3xl mt-5 ml-4 mb-3">
                  For You
                </Text>
              ) : (
                <Text className="text-black text-sm mt-7 ml-5 mb-3 capitalize">
                  Showing {value1} jobs in {value2}
                </Text>
              )}

              <Text className="text-black left-[25%] absolute top-[30%] text-[25px]">
                {status}
              </Text>

              {loading ? (
                <View>
                  <Text className="text-black font-bold text-xl text-center mt-20 mb-4">
                    Loading your future job
                  </Text>
                  <ActivityIndicator size="large" color="#2451f1" />
                </View>
              ) : (
                <FlatList
                  data={forYou}
                  renderItem={({item}) => (
                    <ForYou
                      {...item}
                      navigate={() =>
                        navigation.navigate('JobDetails', {
                          product: item,
                        })
                      }
                    />
                  )}
                  keyExtractor={item => item.job_id}
                  className="mb-[182px]"
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
}
