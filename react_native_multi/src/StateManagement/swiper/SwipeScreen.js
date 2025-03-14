import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';

const slides = [
    {
        key: 'slide1',
        title: '당신의 모든 링크를 하나로',
        text: '가장 편리한 멀티링크 서비스',
        image: require('./assets/intro_1.png'),
    },
    {
        key: 'slide2',
        title: '당신의 링크, 당신의 스타일',
        text: '커버 이미지, SNS 링크, 브랜드 로고 등\n나만의 컨텐츠를 원크리에이터로 꾸며보세요.',
        image: require('./assets/intro_2.png'),
    },
    {
        key: 'slide3',
        title: '실시간으로 확인하는 수익',
        text: '언제 어디서나 쉽게 다양한 결제정보와\n비즈니스 수익현황을 확인하세요.',
        image: require('./assets/intro_3.png'),
    },
    {
        key: 'slide4',
        title: '기업으로부터 제안 받기',
        text: '원크 공유 링크으로 기업으로부터 비즈니스\n제안을 직접 받아보세요.',
        image: require('./assets/intro_4.png'),
    },
];

const SwipeScreen = () => {
    const { width } = useWindowDimensions();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const slideRef = useRef(null); // 슬라이드 참조

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image
                    source={item.image}
                    style={[styles.image, { width: width * 0.8 }]}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const onDone = () => {
        Alert.alert('시작하기 버튼 클릭');
        // navigation.navigate('components');
    };

    // 자동 슬라이드 실행
    useEffect(() => {
        const timer = setInterval(() => {
            if (currentSlideIndex < slides.length - 1) {
                slideRef.current?.goToSlide(currentSlideIndex + 1);
                setCurrentSlideIndex(prev => prev + 1);
            } else {
                slideRef.current?.goToSlide(0);
                setCurrentSlideIndex(0);
            }
        }, 2000);

        return () => clearInterval(timer);
    }, [currentSlideIndex]);

    return (
        <View style={styles.container}>
            <AppIntroSlider
                ref={slideRef} // 슬라이드 참조
                data={slides}
                renderItem={renderItem}
                onSlideChange={(index) => {
                    setCurrentSlideIndex(index);
                }}
                renderPagination={() => {
                    return (
                        <View style={styles.dotsContainer}>
                            {slides.map((slide, index) => (
                                <View key={slide.key} style={[styles.dot, index === currentSlideIndex && styles.activeDot]} />
                            ))}
                        </View>
                    );
                }}
            />

            {
                currentSlideIndex === slides.length - 1 && (
                    <TouchableOpacity onPress={onDone}>
                        <View style={styles.doneButtonContainer}>
                            <View style={styles.doneButton}>
                                <Text style={styles.doneButtonText}>시작하기</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 25
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        height: 300,
        marginBottom: 30,
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    dot: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: 12,
        height: 12,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#8B00FF',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        height: 50,
    },
    doneButtonContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: '100%',
        paddingHorizontal: 25,
    },
    doneButton: {
        backgroundColor: '#8B00FF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SwipeScreen;