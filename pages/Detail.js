import React from 'react';
import Container from '../components/Container';
import Contents from '../components/Contents';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Text = styled.Text`
    font-size: 20px;
    line-height: 28px;
`;



function Detail( { navigation, route } ) {
    
    const [text, setText] = React.useState('');

    React.useLayoutEffect(() => { // 네비게이션 셋옵션스 처리 방법 변경 . useLayoutEffect => 화면에 DOM을 그리기 전에 데이터를 먼저 처리해줌 

        navigation.setOptions({
          title: route.params.date === '' ? '날짜 없음' : route.params.date,
        });

        AsyncStorage.getItem('list').then (data => { 
            const list = JSON.parse(data); // 리스트에 json 파싱
            const diary = list.find( element => element.date === route.params.date ); // 키값으로 데이터 찾기
            setText(diary.text); // 세팅
        })

      }, [navigation, route.params.date]);
    

    return (
        <Container>
            <Text> {text} </Text>
        </Container>
    )
}

export default Detail;