import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { HomeProps } from '../types/types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Container from '../components/Container';
import Card from '../components/Card';
 
const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <ScrollView style={styles.wrapper}>
            <Container>
                <View style={styles.main}>
                    <Card
                        date={new Date()}
                        icon='10n'
                        description='Test'
                        time={false}
                        data='22°C'
                    />
                </View>
            </Container>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: hp('1%')
    },
    main: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
 
export default Home;