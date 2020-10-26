import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Container: React.FC = ({ children }) => {
    return (
        <View style={styles.container}>
            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp('90%'),
        marginHorizontal: wp('5%'),
    }
});

export default Container;