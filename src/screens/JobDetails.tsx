import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

export default function JobDetails({route}) {
  const [activeInfo, setActiveInfo] = useState('Overview');

  const {product} = route.params;
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View>
          <View className="flex justify-center items-center mt-8">
            <Image
              source={
                product.employer_logo
                  ? {uri: product.employer_logo}
                  : {
                      uri: 'https://th.bing.com/th/id/OIP.R4kmGssSLhSeuVYwnM-PRAHaHa?pid=ImgDet&rs=1',
                    }
              }
              className="w-64 h-32"
              style={{objectFit: 'contain'}}
            />
            <View>
              <Text className="text-black text-center text-xl my-2">
                {product.job_title}
              </Text>
              <Text className="text-black text-center text-xl">
                {product.job_city} &#183; {product.job_country}
              </Text>
            </View>
            <TouchableOpacity
              className="my-4 bg-[#2451f1] px-5 py-2"
              onPress={() => Linking.openURL(product.job_apply_link)}>
              <Text className=" font-bold text-white">Apply For The Job</Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-around mt-2">
            <TouchableWithoutFeedback onPress={() => setActiveInfo('Overview')}>
              <Text
                className="text-black pb-1"
                style={
                  activeInfo === 'Overview'
                    ? {borderBottomWidth: 2, borderColor: '#2451f1'}
                    : {}
                }>
                Overview
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setActiveInfo('Company')}>
              <Text
                className="text-black pb-1"
                style={
                  activeInfo === 'Company'
                    ? {borderBottomWidth: 2, borderColor: '#2451f1'}
                    : {}
                }>
                Company
              </Text>
            </TouchableWithoutFeedback>
          </View>

          {activeInfo === 'Overview' ? (
            <View className="my-3 mx-4">
              <Text className="text-black">{product.job_description}</Text>
            </View>
          ) : (
            <View className="my-3 mx-4">
              <Text className="text-black text-center text-lg font-semibold">
                {product.employer_name}
              </Text>
              <View className="mt-4 mb-3">
                <Text
                  className="text-black mb-1"
                  style={
                    product.job_is_remote
                      ? {}
                      : {textDecorationLine: 'line-through'}
                  }>
                  Remote Job
                </Text>
                <Text className="text-black">
                  Minimum Salary:{' '}
                  {product.job_min_salary
                    ? product.job_min_salary
                    : 'Not mentioned'}
                </Text>
              </View>
              <View>
                <Text className="text-black text-lg mb-2">Requirements</Text>
                <View>
                  <Text className="text-black">
                    Degree:{' '}
                    {product.job_required_education !== null
                      ? 'Required'
                      : 'Not required'}
                  </Text>
                  <Text className="text-black my-2">
                    Experience:{' '}
                    {product.job_required_experience !== null
                      ? 'Required'
                      : 'Not required'}
                  </Text>
                  <Text className="text-black">
                    Skills:{' '}
                    {product.job_required_skills !== null
                      ? 'Required'
                      : 'Not required'}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-black text-lg mb-1 mt-2">Publisher</Text>
                <Text className="text-black">{product.job_publisher}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
