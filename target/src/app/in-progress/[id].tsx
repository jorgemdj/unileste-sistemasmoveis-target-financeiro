import { useCallback, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native'
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Progress } from '@/components/Progress'
import { List } from '@/components/List'
import { Transaction } from '@/components/Transaction'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import {
  getTargets,
  removeTransaction,
  getCurrentValue,
  getProgress,
  formatCurrency,
  Target,
} from '@/storage'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [target, setTarget] = useState<Target | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      async function load() {
        setIsLoading(true)
        const all = await getTargets()
        const found = all.find((t) => t.id === id) ?? null
        setTarget(found)
        setIsLoading(false)
      }
      load()
    }, [id])
  )

  async function handleRemoveTransaction(transactionId: string) {
    Alert.alert('Remover', 'Deseja remover esta transação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await removeTransaction(id, transactionId)
          const all = await getTargets()
          setTarget(all.find((t) => t.id === id) ?? null)
        },
      },
    ])
  }

  if (isLoading) return <Loading />
  if (!target) return null

  const current = getCurrentValue(target)
  const progress = getProgress(target)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <MaterialIcons name="arrow-back" size={22} color={colors.black} />
        </Pressable>

        <Pressable
          onPress={() =>
            router.navigate({
              pathname: '/target',
              params: {
                id: target.id,
                name: target.name,
                targetValue: String(target.targetValue),
              },
            })
          }
          hitSlop={12}
        >
          <MaterialIcons name="edit" size={20} color={colors.gray[500]} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{target.name}</Text>

        <Progress
          percentage={progress}
          current={formatCurrency(current)}
          target={formatCurrency(target.targetValue)}
        />

        <View style={styles.divider} />

        <List
          title="Transações"
          data={target.transactions}
          renderItem={({ item }) => (
            <Transaction
              data={item}
              onRemove={() => handleRemoveTransaction(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          emptyMessage="Nenhuma transação ainda. Toque em Nova transação para guardar seu primeiro valor."
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Nova transação"
          onPress={() => router.navigate(`/transaction/${id}`)}
        />
      </View>
    </View>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 8,
    gap: 20,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.black,
    letterSpacing: -0.3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[100],
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
})
