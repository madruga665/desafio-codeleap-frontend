'use client'

import { useSyncExternalStore } from 'react'
import { StorageKeys, CustomEvents } from '@/src/lib/storage-keys'

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  window.addEventListener(CustomEvents.USERNAME_CHANGE, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(CustomEvents.USERNAME_CHANGE, callback)
  }
}

const getSnapshot = () => {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(StorageKeys.USERNAME)
}

const getServerSnapshot = () => null

export function useUsername() {
  const username = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const saveUsername = (name: string) => {
    sessionStorage.setItem(StorageKeys.USERNAME, name)
    window.dispatchEvent(new Event(CustomEvents.USERNAME_CHANGE))
  }

  return { username, saveUsername }
}