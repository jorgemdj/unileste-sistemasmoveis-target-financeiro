import { useRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = {
  label: string
  value: number | null
  onChangeValue?: (value: number | null) => void
}

function formatDisplay(cents: number): string {
  const inteiro = Math.floor(cents / 100)
  const dec = cents % 100
  return `${inteiro.toLocaleString('pt-BR')},${String(dec).padStart(2, '0')}`
}

export function CurrencyInput({ label, value, onChangeValue }: Props) {
  // Converte valor numérico (ex: 1.5) para centavos (ex: 150)
  const centsRef = useRef<number>(value != null ? Math.round(value * 100) : 0)

  const display = centsRef.current === 0 ? '' : formatDisplay(centsRef.current)

  function handleChange(text: string) {
    // Mantém apenas dígitos
    const digits = text.replace(/\D/g, '')
    const cents = digits === '' ? 0 : parseInt(digits, 10)
    centsRef.current = cents
    onChangeValue?.(cents === 0 ? null : cents / 100)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.prefix}>R$</Text>
        <TextInput
          style={styles.input}
          value={display}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder="0,00"
          placeholderTextColor={colors.gray[400]}
        />
      </View>
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
  inputWrapper: {
    height: 52,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 6,
    backgroundColor: colors.white,
  },
  prefix: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    color: colors.gray[500],
  },
  input: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.black,
    padding: 0,
  },
})
