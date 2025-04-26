import { constants } from './constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import crypto from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hashPassword(password: string) {
  const salt = constants.SALT
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return hash
}
