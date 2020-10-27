import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Container from './Container';
import SearchBar from './SearchBar';

const NavBar: React.FC<{ navigate: (name: string, params: object) => void }> = ({ navigate }) => {
    return (
        <Container>
            <View style={styles.nav}>
                <Text style={styles.title}>Weather</Text>
                <SearchBar navigate={navigate} />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    nav: {
        paddingTop: hp('1.5%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        width: wp('50%'),
        fontFamily: 'Poppins-Bold',
        fontSize: hp('3.5%')
    }
});

export default NavBar;