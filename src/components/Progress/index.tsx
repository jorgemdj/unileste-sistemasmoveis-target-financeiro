import { StyleSheet, Text, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props = {
  percentage: number
  current: string
  target: string
}

export function Progress({ percentage, current, target }: Props) {
  const safe = Math.max(0, Math.min(percentage, 100))

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Valor guardado</Text>
          <View style={styles.valueRow}>
            <Text style={styles.current}>{current}</Text>
            <Text style={styles.target}> de {target}</Text>
          </View>
        </View>
        <Text style={styles.percentage}>{Math.round(safe)}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${safe}%` }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  current: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
    letterSpacing: -0.3,
  },
  target: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
  percentage: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.blue[500],
  },
  track: {
    width: '100%',
    height: 8,
    backgroundColor: colors.gray[100],
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    backgroundColor: colors.blue[500],
    borderRadius: 999,
  },
})
