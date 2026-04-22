import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'
import { TransactionTypes } from '@/utils/TransactionTypes'

export type TransactionData = {
  id: string
  title: string
  value: number
  type: TransactionTypes
  date: string
}

type Props = {
  data: TransactionData
  onRemove?: () => void
}

export function Transaction({ data, onRemove }: Props) {
  const isInput = data.type === TransactionTypes.Input
  const formattedValue = data.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <MaterialIcons
          name={isInput ? 'arrow-upward' : 'arrow-downward'}
          size={16}
          color={isInput ? colors.blue[500] : colors.red[400]}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.value}>{formattedValue}</Text>
        <Text style={styles.date}>{data.date}{data.title ? ` • ${data.title}` : ''}</Text>
      </View>

      {!!onRemove && (
        <Pressable onPress={onRemove} hitSlop={12} style={styles.removeBtn}>
          <MaterialIcons name="close" size={16} color={colors.gray[400]} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  value: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.black,
  },
  date: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 1,
  },
  removeBtn: {
    padding: 4,
  },
})
