import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
 
const SearchBar: React.FC = () => {
    const [ query, setQuery ] = useState<string>('');

    return (
        <View style={styles.wrapper}>
            <TextInput
                style={styles.input}
                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                placeholder='Search'
                onChangeText={text => setQuery(text)}
                keyboardType='web-search'
                value={query}
            />
            <Icon
                name='search'
                size={24}
                color='rgba(0, 0, 0, 0.5)'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: wp('50%'),
        paddingHorizontal: wp('0.5%'),
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        borderRadius: 5,
        height: hp('6.5%')
    }
});

export default SearchBar;