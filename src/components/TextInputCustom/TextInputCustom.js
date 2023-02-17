import {TextInput, View, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Margin,
  Padding,
} from '../../constants/globalStyles';

const TextInputCustom = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={[styles.container]}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={[
              styles.textInput,
              error && {
                borderWidth: Border.br_1xs,
                borderColor: Color.lighterRed,
              },
            ]}
            secureTextEntry={secureTextEntry}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
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
    padding: Padding.p_7sm,
    height: 50,
  },
  iconStyle: {
    position: 'absolute',
    zIndex: 1,
    left: Margin.m_7sm,
    top: Margin.m_2sm,
    fontSize: FontSize.size_4md,
    color: Color.darkgray_100,
  },
  errorText: {
    color: Color.red,
    fontFamily: FontFamily.dMSansRegular,
    fontSize: FontSize.size_2sm,
    lineHeight: 16,
    paddingTop: Padding.p_3xs,
  },
});

export default TextInputCustom;
