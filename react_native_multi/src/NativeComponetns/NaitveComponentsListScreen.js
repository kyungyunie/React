import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ViewBoxesWithColorAndText from './View';
import TextInANest from './Text';
import TextInputExample from './TextInput';
import TouchableOpacityExample from './TouchableOpacity';
import TouchableHighlightExample from './TouchableHighlight';
import TouchableWithoutFeedbackExample from './TouchableWithoutFeedback';
import SwitchExample from './Switch';
import KeyboardAvoidingViewExample from './KeyboardAvoidingView';
import PressableExample from './Pressable';
import ScrollViewExample from './ScrollView';
import SectionListExample from './SectionList';
import StatusBarExample from './StatusBar';
import ImageExample from './Image';
import ImageBackgroundExample from './ImageBackground';
import ModalExample from './Modal';
import ButtonExample from './Button';
import FlatListExample from './FlatList';
import ActivityIndicatorExample from './ActivityIndicator';

const NativeComponents = [
    {
        idx: 1,
        name: 'View',
        route: 'component/view',
        component: <ViewBoxesWithColorAndText />,
    },
    {
        idx: 2,
        name: 'Text',
        route: 'component/text',
        component: <TextInANest />,
    },
    {
        idx: 3,
        name: 'TextInput',
        route: 'component/textinput',
        component: <TextInputExample />,
    },
    {
        idx: 4,
        name: 'Button',
        route: 'component/button',
        component: <ButtonExample />,
    },
    {
        idx: 5,
        name: 'Switch',
        route: 'component/switch',
        component: <SwitchExample />,
    },
    {
        idx: 6,
        name: 'KeyboardAvoidingView',
        route: 'component/keyboardavoidingview',
        component: <KeyboardAvoidingViewExample />,
    },
    {
        idx: 7,
        name: 'Pressable',
        route: 'component/pressable',
        component: <PressableExample />,
    },
    {
        idx: 8,
        name: 'ScrollView',
        route: 'component/scrollview',
        component: <ScrollViewExample />,
    },
    {
        idx: 9,
        name: 'SectionList',
        route: 'component/sectionlist',
        component: <SectionListExample />,
    },

    {
        idx: 10,
        name: 'FlatList',
        route: 'component/flatlist',
        component: <FlatListExample />,
    },
    {
        idx: 11,
        name: 'ActivityIndicator',
        route: 'component/activityindicator',
        component: <ActivityIndicatorExample />,
    },
    {
        idx: 12,
        name: 'TouchableOpacity',
        route: 'component/touchableopacity',
        component: <TouchableOpacityExample />,
    },
    {
        idx: 13,
        name: 'TouchableHighlight',
        route: 'component/touchablehighlight',
        component: <TouchableHighlightExample />,
    },
    {
        idx: 14,
        name: 'TouchableWithoutFeedback',
        route: 'component/touchablewithoutfeedback',
        component: <TouchableWithoutFeedbackExample />,
    },
    {
        idx: 15,
        name: 'Image',
        route: 'component/image',
        component: <ImageExample />,
    },
    {
        idx: 16,
        name: 'ImageBackground',
        route: 'component/imagebackground',
        component: <ImageBackgroundExample />,
    },
    {
        idx: 17,
        name: 'Modal',
        route: 'component/modal',
        component: <ModalExample />,
    },
    {
        idx: 18,
        name: 'StatusBar',
        route: 'component/statusbar',
        component: <StatusBarExample />,
    },
];


const NaitveComponentsListScreen = () => {
    const navigation = useNavigation();

    const handlePress = (item) => {
        navigation.navigate(item.route, item);
    };


    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <FontAwesome5 name="cloud" size={30} color="skyblue" />
                <Text style={styles.title}>React Native Component</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={NativeComponents}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            key={item.idx}
                            onPress={() => handlePress(item)}
                        >
                            <View style={styles.componentItem}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        paddingTop: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    },
    titleContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ececec',
        borderRadius: 10,
    },
    componentItem: {
        height: 50,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ececec',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default NaitveComponentsListScreen;