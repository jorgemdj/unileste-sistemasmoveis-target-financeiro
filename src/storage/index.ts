import AsyncStorage from '@react-native-async-storage/async-storage'
import { TransactionTypes } from '@/utils/TransactionTypes'

export type Transaction = {
  id: string
  title: string
  value: number
  type: TransactionTypes
  date: string
}

export type Target = {
  id: string
  name: string
  targetValue: number
  transactions: Transaction[]
}

const STORAGE_KEY = '@target:goals'

export async function getTargets(): Promise<Target[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export async function saveTargets(targets: Target[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(targets))
}

export async function addTarget(target: Omit<Target, 'id' | 'transactions'>): Promise<Target> {
  const targets = await getTargets()
  const newTarget: Target = {
    ...target,
    id: Date.now().toString(),
    transactions: [],
  }
  await saveTargets([...targets, newTarget])
  return newTarget
}

export async function updateTarget(id: string, data: Partial<Pick<Target, 'name' | 'targetValue'>>): Promise<void> {
  const targets = await getTargets()
  const updated = targets.map(t => t.id === id ? { ...t, ...data } : t)
  await saveTargets(updated)
}

export async function deleteTarget(id: string): Promise<void> {
  const targets = await getTargets()
  await saveTargets(targets.filter(t => t.id !== id))
}

export async function addTransaction(targetId: string, transaction: Omit<Transaction, 'id' | 'date'>): Promise<void> {
  const targets = await getTargets()
  const updated = targets.map(t => {
    if (t.id !== targetId) return t
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }),
    }
    return { ...t, transactions: [newTransaction, ...t.transactions] }
  })
  await saveTargets(updated)
}

export async function removeTransaction(targetId: string, transactionId: string): Promise<void> {
  const targets = await getTargets()
  const updated = targets.map(t => {
    if (t.id !== targetId) return t
    return { ...t, transactions: t.transactions.filter(tx => tx.id !== transactionId) }
  })
  await saveTargets(updated)
}

export function getCurrentValue(target: Target): number {
  return target.transactions.reduce((acc, tx) => {
    return tx.type === TransactionTypes.Input ? acc + tx.value : acc - tx.value
  }, 0)
}

export function getProgress(target: Target): number {
  const current = getCurrentValue(target)
  if (target.targetValue <= 0) return 0
  return Math.min(Math.max((current / target.targetValue) * 100, 0), 100)
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function getSummary(targets: Target[]) {
  let totalInput = 0
  let totalOutput = 0

  for (const target of targets) {
    for (const tx of target.transactions) {
      if (tx.type === TransactionTypes.Input) totalInput += tx.value
      else totalOutput += tx.value
    }
  }

  return {
    total: formatCurrency(totalInput - totalOutput),
    input: { label: 'Entradas', value: formatCurrency(totalInput) },
    output: { label: 'Saídas', value: formatCurrency(totalOutput) },
  }
}
