import {TextInput, View, StyleSheet} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Margin,
  Padding,
} from '../../constants/globalStyles';

const iconSize = FontSize.size_4md;

const TextInputSearch = ({placeholder, secureTextEntry, onChange}) => {
  return (
    <View style={[styles.container]}>
      <Fontisto name="search" color={Color.red} style={styles.iconStyle} />
      <TextInput
        value={''}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[styles.textInput]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    backgroundColor: Color.white,
    fontFamily: FontFamily.dMSansMedium,
    fontSize: FontSize.size_2sm,
    lineHeight: 16,
    color: Color.darkgray_100,
    borderRadius: Border.br_10xs,
    padding: Padding.p_2sm,
    paddingLeft: Padding.p_7sm + Padding.p_2sm + iconSize,
    height: 40,
  },
  iconStyle: {
    position: 'absolute',
    zIndex: 1,
    left: Margin.m_7sm,
    top: Margin.m_7xs,
    fontSize: iconSize,
    color: Color.darkgray_100,
  },
});

export default TextInputSearch;
