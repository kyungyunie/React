import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StateManagementScreen = () => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('intro')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>useState/useEffect</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('context')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Context API</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('redux')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Redux</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        width: '100%',
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 30,

    },
    buttonText: {
        fontSize: 20,
    },
});

export default StateManagementScreen;