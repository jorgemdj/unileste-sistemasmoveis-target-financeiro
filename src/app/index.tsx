import { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { router, useFocusEffect } from 'expo-router'
import { HomeHeader } from '@/components/HomeHeader'
import { List } from '@/components/List'
import { Button } from '@/components/Button'
import { TargetCard } from '@/components/TargetCard'
import { Loading } from '@/components/Loading'
import {
  getTargets,
  getSummary,
  getCurrentValue,
  getProgress,
  formatCurrency,
  Target,
} from '@/storage'
import { colors } from '@/theme/colors'

export default function Index() {
  const [targets, setTargets] = useState<Target[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      async function load() {
        setIsLoading(true)
        const data = await getTargets()
        setTargets(data)
        setIsLoading(false)
      }
      load()
    }, [])
  )

  if (isLoading) return <Loading />

  const summary = getSummary(targets)

  return (
    <View style={styles.container}>
      <HomeHeader data={summary} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <List
          title="Metas"
          data={targets}
          renderItem={({ item }) => (
            <TargetCard
              name={item.name}
              percentage={getProgress(item)}
              current={formatCurrency(getCurrentValue(item))}
              target={formatCurrency(item.targetValue)}
              onPress={() => router.navigate(`/in-progress/${item.id}`)}
            />
          )}
          emptyMessage="Nenhuma meta criada ainda. Toque em Nova meta para começar."
          keyExtractor={(item) => item.id}
        />

        <Button
          title="Nova meta"
          onPress={() => router.navigate('/target')}
          style={styles.newButton}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    gap: 24,
  },
  newButton: {
    marginTop: 8,
  },
})
