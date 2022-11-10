import { View, Text, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import React from 'react';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const PreparingOrderScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Delivery')
      }, 4000);
    }, []);

  return (
    <SafeAreaView className='bg-[#00CCBB] justify-center items-center flex-1'> 
       <Animatable.Image source={require('../assets/Loading.gif')} animation='slideInUp' iterationCount={1} className='h-96 w-96'/>

       <Animatable.Text animation='slideInUp' iterationCount={1} className='text-lg my-10 text-white font-bold text-center'>
        Waiting for Restaurant to accept your order!
       </Animatable.Text> 

    <Progress.Circle size={60} indeterminate={true} color='white'/>

    </SafeAreaView>
  )
}

export default PreparingOrderScreen;