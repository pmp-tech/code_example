import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { CardContainer } from "../../components";
import { IMaster } from "../../interfaces";
import RightArrowIcon from '../../assets/icons/arrow_right.svg';
import styles from "./styles";
import { serviceTypeTranslate } from "../../utils";

interface MasterCardProps {
    data: IMaster,
    onPress: () => void
}

const MasterCard: FC<MasterCardProps> = ({ data, onPress }) => {
    return <CardContainer style={styles.masterCardContainer} onPress={onPress}>
        <View style={styles.masterCardContentContainer}>
            {data.avatar ? <Image
                source={{ uri: data.avatar }}
                style={styles.masterCardAvatar}
                resizeMode='contain' /> : <Image
                source={require('./../../assets/master-avatar.jpg')}
                style={styles.masterCardAvatar}
                resizeMode='contain' />}

            <View style={styles.masterCardTextContainer}>
                <Text style={styles.masterCardTitle}>{data.name} {data.surname}</Text>
                <Text style={styles.masterCardSubtitle}>{serviceTypeTranslate(data.service_type)}</Text>
            </View>
            <TouchableOpacity style={styles.masterCardBtn}>
                <RightArrowIcon fill='#B1B5BB' />
            </TouchableOpacity>
        </View>
    </CardContainer>
}

export default MasterCard;