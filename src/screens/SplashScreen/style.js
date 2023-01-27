import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 32,
    flexDirection: 'column',
    flex: 1,
  },
  headerArea: {
    backgroundColor: 'red',
    flex: 1,
  },
  logoName: {
    textAlign: 'right',
    marginTop: 51,
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    lineHeight: 23,
    color: '#000000'
  },
  imageArea: {
    backgroundColor: 'pink',
    flex: 3,
  },
  titleArea: {
    // backgroundColor: 'yellow',
    flex: 2,
  },
  footerArea: {
    backgroundColor: 'blue',
    flex: 1,
  },
});

export default styles;
