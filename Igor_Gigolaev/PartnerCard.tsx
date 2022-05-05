import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CardContainer, Typography } from "../../components";
import { IPartner } from "../../interfaces";
import RightArrowIcon from '../../assets/icons/arrow_right.svg';
import styles from "./styles";

interface PartnerCardProps {
    data: IPartner,
    onPress: () => void
}

const PartnerCard: FC<PartnerCardProps> = ({ data, onPress }) => {
    return <CardContainer innerStyle={{ padding: 0 }} style={styles.partnerCardContainer} onPress={onPress}>
        <View style={styles.partnerCardContent}>
            {data.cover ? 
            <Image source={{ uri: data.cover }} style={styles.partnerCardCover} resizeMode='cover' /> : 
            <Image source={require('./../../assets/partner-logo.png')} style={styles.partnerCardCover} resizeMode='cover' />}

            <View style={styles.partnerCardTextContainer}>
                <Typography title={data.name} variant='h4' style={styles.partnerCardTitle} nuberOfLines={1} />
                <Text style={styles.partnerCardSubtitle} numberOfLines={2}>{data.short_description}</Text>
            </View>
            <View style={styles.partnerCardArrow}>
                <RightArrowIcon fill='#B1B5BB' />
            </View>
        </View>
    </CardContainer>
}

export default PartnerCard;