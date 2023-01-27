import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const TouchableOpacityCustom = ({text, textColor, bgColor}) => {
  return (
    <TouchableOpacity style={[{backgroundColor: `${bgColor}`}, styles.touchableOpacity]}>
      <Text style={[{color: `${textColor}`}, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TouchableOpacityCustom;
