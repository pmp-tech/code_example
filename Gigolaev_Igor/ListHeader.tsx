import React, { FC } from "react";
import { Text, View } from "react-native";
import { CardContainer, Typography } from "../../components";
import FilterIcon from './../../assets/icons/filter.svg'
import styles from "./styles";

interface ListHeaderProps {
    title: string,
    onPress: () => void
}

const ListHeader: FC<ListHeaderProps> = ({ title, onPress }) => {
    return <CardContainer onPress={onPress}>
        <View style={styles.listHeaderTextWrapper}>
            <Text style={styles.listHeaderTitle}>{title}</Text>
            <FilterIcon />
        </View>
    </CardContainer>
}

export default ListHeader