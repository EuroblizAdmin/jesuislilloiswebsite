'use client'

import { makePage } from '@keystatic/next/ui/app'
import config from '../../../keystatic.config'
import { KeystaticWrapper } from '@/components/keystatic-wrapper'

const KeystaticAdmin = makePage(config)

export default function KeystaticPage(props: any) {
  return (
    <KeystaticWrapper>
      <KeystaticAdmin {...props} />
    </KeystaticWrapper>
  )
}
