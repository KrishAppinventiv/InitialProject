import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white,},
    slide: { width},
    image: { width: '100%', flex:.8 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
    description: { fontSize: 16, textAlign: 'center', marginTop: 10, paddingHorizontal: 20 },
    paginationDots: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.darkGrey,
        marginHorizontal: 5,
    },
    bottomContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    progressCircleContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressCircle: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: colors.red,
        borderRadius: 25,
    },
    arrowContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default styles;