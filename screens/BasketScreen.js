import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestaurant } from '../features/resturantSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';


const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupedItemsInBasket(groupedItems);
    }, []);
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 bg-gray-100'>
            <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
                <View>
                    <Text className='text-lg font-bold text-center'>Basket</Text>
                    <Text className='text-center text-gray-400'>{restaurant.title}</Text>
                </View>

                <TouchableOpacity onPress={navigation.goBack} className='rounded-full bg-gray-100 absolute top-3 right-5'>
                    <XCircleIcon color='#00CCBB' size={50}/>
                </TouchableOpacity>
            </View>

            <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
                <Image source={{
                    url: 'https://links.papareact.com/wru'
                }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                 />
                 <Text className='flex-1'>Deliver in 50-75 mins</Text>
                 <TouchableOpacity>
                    <Text className='text-[#00CCBB]'>Change</Text>
                 </TouchableOpacity>
            </View>

            <ScrollView className='divide-y divide-gray-200'>
                {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                    <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                        <Text className='text-[#00CCBB]'>{items.length}</Text>
                        <Image source={{ uri: urlFor(items[0]?.image).url()}} className='h-12 w-12 rounded-full'/>
                        <Text className='flex-1'>{items[0]?.name}</Text>
                        <Text className='text-gray-600'>
                            <Currency quantity={items[0]?.price} currency='NGN'/>
                        </Text>
                        <TouchableOpacity>
                            <Text className='text-xs text-[#00CCBB]' onPress={() => dispatch(removeFromBasket({ id: key }))}>Remove</Text>
                        </TouchableOpacity>
                </View>
                ))}
            </ScrollView>

            <View className='p-5 bg-white mt-5 space-y-4'>
                <View className='flex-row justify-between'>
                    <Text className='text-gray-400'>subtotal</Text>
                    <Text className='text-gray-400'>
                        <Currency quantity={basketTotal} currency='NGN'/>
                    </Text>
                </View>

                <View className='flex-row justify-between'>
                    <Text className='text-gray-400'>Delivery fee</Text>
                    <Text className='text-gray-400'>
                        <Currency quantity={20} currency='NGN'/>
                    </Text>
                </View>

                <View className='flex-row justify-between'>
                    <Text>order Total</Text>
                    <Text className='font-extrabold'>
                        <Currency quantity={basketTotal + 20} currency='NGN'/>
                    </Text>
                </View>

                <TouchableOpacity className='rounded-lg bg-[#00CCBB] p-4' onPress={() => navigation.navigate('PreparingOrderScreen')}>
                    <Text className='text-center text-white text-lg font-bold'>place oder</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default BasketScreen;  