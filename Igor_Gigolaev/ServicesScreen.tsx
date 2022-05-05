import React, { FC, useEffect, useState } from "react"
import { FlatList, SafeAreaView, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { Switcher, Typography } from "../../components"
import { switcherData, TEXT_ALIGN } from "../../constants"
import { IMaster, IPartner } from "../../interfaces"
import { RootStateType } from "../../redux/store"
import { getMasters, getPartners } from "../../redux/thunks"
import ListHeader from "./ListHeader"
import MasterCard from "./MasterCard"
import PartnerCard from "./PartnerCard"
import styles from "./styles"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ServicesStackParamList } from "../../navigation/Services"

type ServicesScreenProps = NativeStackScreenProps<ServicesStackParamList, 'Services'>;

export const ServicesScreen = ({navigation}: ServicesScreenProps) => {
    const [switcher, setSwitcher] = useState(switcherData);
    const [screenType, setScreenType] = useState('masters');
    const masters = useSelector<RootStateType, IMaster[]>(state => state.masters.masters)
    const partners = useSelector<RootStateType, IPartner[]>(state => state.partners.partners)
    const dispatch = useDispatch();

    const changeSwitcher = (id: number) => {
        setSwitcher(prev => prev.map((el) => {
            if (el.id === id) {
                el.isActive = true
                setScreenType(el.type)
            } else {
                el.isActive = false
            }
            return el
        }))
    }

    useEffect(() => {
        dispatch(getMasters())
        dispatch(getPartners())
    }, [])

    return <SafeAreaView style={styles.screen}>
        <View style={styles.topWrapper}>
            <Typography align={TEXT_ALIGN.LEFT} title={screenType === 'masters' ? "Услуги" : 'Партнеры'} variant={"h1"} style={styles.h1} />
            <Switcher data={switcher} onElementPress={changeSwitcher} style={styles.switcher} />
        </View>
        {
            screenType === 'masters' ?
                <FlatList
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    ListHeaderComponentStyle={styles.listHeaderContainer}
                    ListHeaderComponent={() => <ListHeader title={'Выберите тип услуги'} onPress={() => navigation.navigate('ServiceType')} />}
                    data={masters || []}
                    renderItem={({ item }) => <MasterCard data={item} onPress={() => null} />}
                /> :
                <FlatList
                    style={styles.listStyle}
                    contentContainerStyle={styles.listContainerStyle}
                    ListHeaderComponentStyle={styles.listHeaderContainer}
                    ListHeaderComponent={() => <ListHeader title={'Выберите категорию'} onPress={() => null} />}
                    data={partners || []}
                    renderItem={({ item }) => <PartnerCard data={item} onPress={() => null}></PartnerCard>}
                />
        }

    </SafeAreaView>
}