import {TextInput, View} from 'react-native';
import styles from './styles';

const TextInputCustom = props => {
  return <TextInput style={styles.textInput} {...props} />;
};

export default TextInputCustom;
