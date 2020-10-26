import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export interface Props {
    date: Date,
    data: string,
    icon: string,
    time: boolean,
    temp?: 'hot' | 'cold' | null,
    description?: string
}
 
const Card: React.FC<Props> = ({ date, time, data, icon, description }) => {
    const timeString: string = `${date.getHours() < 10 ? 0 : ''}${date.getHours()}:${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;

    return (
        <View style={styles.wrapper}>
            <Text style={styles.date}>{ time ? timeString : '' } {date.toDateString().split(' ')[0]} {date.getDate() + '/' + (date.getMonth() + 1)}</Text>
            <Text style={styles.data}>{data}</Text>
            <Image 
                style={styles.icon}
                source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
            />
            <Text style={styles.description}>{description && description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 5,
        elevation: 1.25,
        marginVertical: hp('2%'),
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('2%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
        fontFamily: 'Poppins-Regular'
    },
    data: {
        textAlign: 'center',
        fontSize: hp('4.5%'),
        fontFamily: 'Poppins-Bold'
    },
    icon: {
        width: wp('30%'),
        height: hp('10%')
    },
    description: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
        fontFamily: 'Poppins-Regular'
    }
});
 
export default Card;