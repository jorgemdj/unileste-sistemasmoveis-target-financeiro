import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = TextInputProps & {
  label: string
}

export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },
  label: {
    color: colors.gray[600],
    fontSize: 12,
    fontFamily: fontFamily.medium,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  input: {
    height: 52,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.gray[200],
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.black,
    backgroundColor: colors.white,
  },
})
