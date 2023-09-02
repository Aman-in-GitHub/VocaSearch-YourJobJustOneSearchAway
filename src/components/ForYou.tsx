import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const ForYou = props => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        className="border border-[#ddd] mx-4 mb-4"
        onPress={props.navigate}>
        <View className="flex flex-row gap-6 px-3 py-5">
          <Image
            source={
              props.employer_logo
                ? {uri: props.employer_logo}
                : {
                    uri: 'https://th.bing.com/th/id/OIP.R4kmGssSLhSeuVYwnM-PRAHaHa?pid=ImgDet&rs=1',
                  }
            }
            className="w-16 h-16"
            style={{objectFit: 'contain'}}
          />
          <View>
            <Text className="text-black font-bold">{props.job_title}</Text>
            <Text className="text-[#525252] text-[12px] my-1">
              {props.job_city} &#183; {props.job_country}
            </Text>
            <Text className="text-[#525252] text-[12px]">
              <Icon name="briefcase" size={15} color="#2451f1" />
              &nbsp;&nbsp;{props.job_employment_type}
            </Text>
          </View>
          <TouchableOpacity
            className="absolute top-[50%] translate-y-[-50%] right-3"
            onPress={() => Linking.openURL(props.job_google_link)}>
            <Icon name="send" size={23} color="#2451f1" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForYou;
