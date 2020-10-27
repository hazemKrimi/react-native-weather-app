import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
 
const Loader: React.FC = () => {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator
                animating={true}
                color='#000000'
                size='small'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: hp('80%'),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
 
export default Loader;