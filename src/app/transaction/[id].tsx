import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { TransactionType } from '@/components/TransactionType'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { addTransaction } from '@/storage'
import { TransactionTypes } from '@/utils/TransactionTypes'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

export default function TransactionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [type, setType] = useState<TransactionTypes>(TransactionTypes.Input)
  const [value, setValue] = useState<number | null>(null)
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSave() {
    if (!value || value <= 0) {
      Alert.alert('Atenção', 'Informe um valor maior que zero.')
      return
    }

    setIsLoading(true)
    try {
      await addTransaction(id, {
        title: reason.trim(),
        value,
        type,
      })
      router.back()
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a transação.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={22} color={colors.black} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Nova transação</Text>
          <Text style={styles.subtitle}>
            A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e
            evitar retirar.
          </Text>
        </View>

        <View style={styles.form}>
          <TransactionType selected={type} onChange={setType} />

          <CurrencyInput
            label="Valor (R$)"
            value={value}
            onChangeValue={setValue}
          />

          <Input
            label="Motivo (opcional)"
            placeholder="Ex: Investir em CDB de 110% no banco XPTO"
            value={reason}
            onChangeText={setReason}
          />
        </View>

        <Button title="Salvar" onPress={handleSave} isLoading={isLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  content: {
    padding: 24,
    paddingTop: 12,
    gap: 32,
  },
  titleBlock: {
    gap: 8,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.black,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray[500],
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
})
