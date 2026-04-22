import { FlatList, FlatListProps, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { colors } from '@/theme/colors'
import { fontFamily } from '@/theme/fontFamily'

type Props<T> = FlatListProps<T> & {
  title: string
  emptyMessage: string
  containerStyle?: ViewStyle
}

export function List<T>({ title, emptyMessage, containerStyle, data, ...rest }: Props<T>) {
  const isEmpty = !data || data.length === 0

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      {isEmpty ? (
        <Text style={styles.empty}>{emptyMessage}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => String(index)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          scrollEnabled={false}
          {...rest}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.black,
    marginBottom: 14,
    letterSpacing: 0.1,
  },
  empty: {
    color: colors.gray[400],
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[100],
    marginVertical: 8,
  },
})
