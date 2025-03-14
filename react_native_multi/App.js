import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodoProvider } from './src/StateManagement/context/TodoContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/StateManagement/redux/TodoStore';
import * as SplashScreen from 'expo-splash-screen';

import MainScreen from './src/MainScreen';
import ViewBoxesWithColorAndText from './src/NativeComponetns/View';
import TextInANest from './src/NativeComponetns/Text';
import TextInputExample from './src/NativeComponetns/TextInput';
import TouchableOpacityExample from './src/NativeComponetns/TouchableOpacity';
import TouchableHighlightExample from './src/NativeComponetns/TouchableHighlight';
import TouchableWithoutFeedbackExample from './src/NativeComponetns/TouchableWithoutFeedback';
import SwitchExample from './src/NativeComponetns/Switch';
import KeyboardAvoidingViewExample from './src/NativeComponetns/KeyboardAvoidingView';
import PressableExample from './src/NativeComponetns/Pressable';
import ScrollViewExample from './src/NativeComponetns/ScrollView';
import SectionListExample from './src/NativeComponetns/SectionList';
import StatusBarExample from './src/NativeComponetns/StatusBar';
import ImageExample from './src/NativeComponetns/Image';
import ImageBackgroundExample from './src/NativeComponetns/ImageBackground';
import ModalExample from './src/NativeComponetns/Modal';
import ButtonExample from './src/NativeComponetns/Button';
import FlatListExample from './src/NativeComponetns/FlatList';
import ActivityIndicatorExample from './src/NativeComponetns/ActivityIndicator';
import TodoContextScreen from './src/StateManagement/context/TodoContextScreen';
import TodoReduxScreen from './src/StateManagement/redux/TodoReduxScreen';
import SwipeScreen from './src/StateManagement/swiper/SwipeScreen';

const Stack = createNativeStackNavigator();

// 앱 시작 시 스플래시 스크린 유지
SplashScreen.preventAutoHideAsync();

export default function App() {

    useEffect(() => {
        const hideSplashScreen = async () => {

            SplashScreen.preventAutoHideAsync();

            await setTimeout(async () => {
                await SplashScreen.hideAsync();
            }, 2000);
        }

        hideSplashScreen();
    }, []);

    return (
        <SafeAreaProvider>
            {/* Redux provider */}
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>

                    {/* Context Provider 사용 */}
                    <TodoProvider>

                        {/* Stack Navigator 사용 */}
                        <NavigationContainer>
                            <Stack.Navigator
                                initialRouteName="main"
                                screenOptions={{
                                    headerBackTitle: "뒤로", // Custom back button title
                                }}
                            >
                                <Stack.Screen name="main" component={MainScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="component/view" component={ViewBoxesWithColorAndText} />
                                <Stack.Screen name="component/text" component={TextInANest} />
                                <Stack.Screen name="component/textinput" component={TextInputExample} />
                                <Stack.Screen name="component/touchableopacity" component={TouchableOpacityExample} />
                                <Stack.Screen name="component/touchablehighlight" component={TouchableHighlightExample} />
                                <Stack.Screen name="component/touchablewithoutfeedback" component={TouchableWithoutFeedbackExample} />
                                <Stack.Screen name="component/switch" component={SwitchExample} />
                                <Stack.Screen name="component/keyboardavoidingview" component={KeyboardAvoidingViewExample} />
                                <Stack.Screen name="component/pressable" component={PressableExample} />
                                <Stack.Screen name="component/scrollview" component={ScrollViewExample} />
                                <Stack.Screen name="component/sectionlist" component={SectionListExample} />
                                <Stack.Screen name="component/statusbar" component={StatusBarExample} />
                                <Stack.Screen name="component/image" component={ImageExample} />
                                <Stack.Screen name="component/imagebackground" component={ImageBackgroundExample} />
                                <Stack.Screen name="component/modal" component={ModalExample} />
                                <Stack.Screen name="component/button" component={ButtonExample} />
                                <Stack.Screen name="component/flatlist" component={FlatListExample} />
                                <Stack.Screen name="component/activityindicator" component={ActivityIndicatorExample} />
                                <Stack.Screen
                                    name="intro"
                                    component={SwipeScreen}
                                    options={{
                                        title: '상태관리 - useState/useEffect', // Custom header title
                                    }}
                                />
                                <Stack.Screen
                                    name="context"
                                    component={TodoContextScreen}
                                    options={{
                                        title: '상태관리 - Context API', // Custom header title
                                    }}
                                />
                                <Stack.Screen
                                    name="redux"
                                    component={TodoReduxScreen}
                                    options={{ title: '상태관리 - Redux' }}
                                />
                            </Stack.Navigator>
                            <StatusBar style="auto" />
                        </NavigationContainer>

                    </TodoProvider>

                </PersistGate>
            </Provider>

        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
