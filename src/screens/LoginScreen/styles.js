import {StyleSheet} from 'react-native';
import COLORS from '../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 29,
    height: '100%',
    backgroundColor: COLORS.background,
    flex: 1,
    flexDirection: 'column',
  },
  areaText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 30,
    lineHeight: 39,
    textAlign: 'center',
    paddingTop: 11,
    color: COLORS.bigTitle,
  },
  subTitleText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: COLORS.text,
  },
  areaInput: {
    flex: 6,
    paddingTop: 11,
  },
  titleInput: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.bigTitle,
  },
  areaButton: {
    flex: 6,
  },
  question: {
    flex: 6,
  },
  signUpText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.text,
    paddingTop: 16,
    textAlign: 'center',
  },
});

export default styles;
