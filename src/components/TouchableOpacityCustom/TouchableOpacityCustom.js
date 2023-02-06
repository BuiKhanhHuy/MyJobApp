import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const TouchableOpacityCustom = ({text, textColor, bgColor, onPress}) => {
  return (
    <TouchableOpacity
      style={[{backgroundColor: `${bgColor}`}, styles.touchableOpacity]}
      onPress={onPress}>
      <Text style={[{color: `${textColor}`}, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    padding: 17,
    borderRadius: 6,
  },
  text: {
    fontFamily: 'DMSans-Bold',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
});

export default TouchableOpacityCustom;
