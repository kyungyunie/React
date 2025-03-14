import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import NaitveComponentsListScreen from './NativeComponetns/NaitveComponentsListScreen';
import StateManagementScreen from './StateManagement/StateManagementScreen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {

    return (
        <Tab.Navigator
            initialRouteName="components"
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'components') {
                        iconName = focused ? "folder-open" : 'folder';
                    } else if (route.name === 'chart') {
                        iconName = 'chart-pie';
                    } else if (route.name === 'state') {
                        iconName = 'paste';
                    }

                    return <FontAwesome5 name={iconName} size={25} color={color} />;
                },
            })}
        >
            <Tab.Screen name="components" component={NaitveComponentsListScreen} options={{ title: "컴포넌트 예시" }} />
            <Tab.Screen name="state" component={StateManagementScreen} options={{ title: "상태 관리" }} />
        </Tab.Navigator>
    );
};


export default MainScreen;