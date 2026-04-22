import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = {
  name: string
  percentage: number
  current: string
  target: string
  onPress: () => void
}

export function TargetCard({ name, percentage, current, target, onPress }: Props) {
  const safe = Math.max(0, Math.min(percentage, 100))

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, { opacity: pressed ? 0.85 : 1 }]}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <MaterialIcons name="chevron-right" size={20} color={colors.gray[400]} />
      </View>

      <Text style={styles.values}>
        {Math.round(safe)}% • {current} de {target}
      </Text>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${safe}%` }]} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.black,
  },
  values: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.gray[500],
  },
  track: {
    width: '100%',
    height: 5,
    backgroundColor: colors.gray[100],
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 2,
  },
  fill: {
    height: 5,
    backgroundColor: colors.blue[500],
    borderRadius: 999,
  },
})
