import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flex: 1,
    },
    h1: {
        marginBottom: 24,
        paddingLeft: 4
    },
    listHeaderContainer: {
        marginBottom: 12,
        height: 64,
    },
    listHeaderTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
    },
    listHeaderTitle: {
        flexShrink: 1,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        color: '#090406'
    },
    switcher: {
        marginBottom: 4
    },
    listStyle: {

    },
    listContainerStyle: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        zIndex: 20,
        overflow: 'visible'
    },
    topWrapper: {
        paddingHorizontal: 16
    },
     //MasterCard
     masterCardContainer: {
        height: 80,
        marginBottom: 8
    },
    masterCardAvatar: {
        height: 48,
        width: 48,
        marginRight: 12,
        borderRadius: 48
    },
    masterCardContentContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    masterCardBtn: {
        width: 24,
        height: 24,
        right: -8,
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    masterCardTitle: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '400',
        color: '#090406'
    },
    masterCardSubtitle: {
        color: '#B1B5BB',
        fontWeight: '500',
        lineHeight: 20,
        fontSize: 14,
        letterSpacing: -0.3
    },
    masterCardTextContainer: {
        flex: 1
    },
    //PartnerCard
    partnerCardContainer: {
        height: 103,
        marginBottom: 8,
    },
    partnerCardCover: {
        width: '27%',
        height: '100%'
    },
    partnerCardContent: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        borderRadius: 16,
        overflow: 'hidden',
    },
    partnerCardTitle: {
        marginBottom: 8,
    },
    partnerCardTextContainer: {
        marginLeft: 12,
        paddingVertical: 16,
        paddingRight: 8,
        flex: 1
    },
    partnerCardSubtitle: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.3,
        color: '#666A74'
    },
    partnerCardArrow: {
        marginLeft: 'auto',
        width: 24,
        height: 24,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 16

    }
})

export default styles