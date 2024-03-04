import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OverViewScreen from '../screens/OverViewScreen';
import ParkingsByDateScreen from '../screens/ParkingsByDateScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="OverView">
            <Stack.Screen
                name="OverView"
                component={OverViewScreen}
                options={{
                    title: "Parking Management",
                    headerTitleAlign: 'center',
                    headerShadowVisible: false
                }}
            />
            <Stack.Screen
                name="ParkingsByDate"
                component={ParkingsByDateScreen}
                options={(props) => ({
                    header: () => <Header title={"Parkings By Date"} onBack={() => props.navigation.goBack()} />,
                    headerShadowVisible: false
                })}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator