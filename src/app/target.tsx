import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { Input } from '@/components/Input'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Button } from '@/components/Button'
import { addTarget, updateTarget, deleteTarget } from '@/storage'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Params = {
  id?: string
  name?: string
  targetValue?: string
}

export default function TargetScreen() {
  const params = useLocalSearchParams<Params>()
  const isEditing = !!params.id

  const [name, setName] = useState(params.name ?? '')
  const [targetValue, setTargetValue] = useState<number | null>(
    params.targetValue ? Number(params.targetValue) : null
  )
  const [isLoading, setIsLoading] = useState(false)

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Informe o nome da meta.')
      return
    }
    if (!targetValue || targetValue <= 0) {
      Alert.alert('Atenção', 'Informe o valor alvo da meta.')
      return
    }

    setIsLoading(true)
    try {
      if (isEditing) {
        await updateTarget(params.id!, { name: name.trim(), targetValue })
      } else {
        await addTarget({ name: name.trim(), targetValue })
      }
      router.back()
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a meta.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    Alert.alert(
      'Excluir meta',
      `Tem certeza que deseja excluir "${name}"? Todas as transações serão removidas.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteTarget(params.id!)
            router.dismissAll()
          },
        },
      ]
    )
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

        {isEditing && (
          <Pressable onPress={handleDelete} hitSlop={12}>
            <MaterialIcons name="delete-outline" size={22} color={colors.red[400]} />
          </Pressable>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Meta</Text>
          <Text style={styles.subtitle}>Economize para alcançar sua meta financeira.</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome da meta"
            placeholder="Ex: Viagem para praia, Apple Watch"
            value={name}
            onChangeText={setName}
          />

          <CurrencyInput
            label="Valor alvo (R$)"
            value={targetValue}
            onChangeValue={setTargetValue}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    gap: 6,
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
