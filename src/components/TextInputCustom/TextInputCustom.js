import {TextInput, View, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import COLORS from '../../constants/colors';

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
        <View style={styles.container}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={[
              styles.textInput,
              error && {borderWidth: 1, borderColor: COLORS.lighterRed},
            ]}
            secureTextEntry={secureTextEntry}
          />
          <Text style={styles.errorText}>{error && error.message}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 17,
    height: 50,
  },
  errorText: {
    color: 'red',
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 3,
  },
});

export default TextInputCustom;
