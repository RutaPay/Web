export interface ConektaTokenSuccess {
  id: string
  livemode?: boolean
  used?: boolean
  object?: string
}

export interface ConektaTokenError {
  object?: string
  type?: string
  message?: string
  message_to_purchaser?: string
  code?: string
}

export interface ConektaCardComponentConfig {
  config: {
    targetIFrame: string
    publicKey: string
    locale?: 'es' | 'en'
    useExternalSubmit?: boolean
  }
  options?: {
    backgroundMode?: 'lightMode' | 'darkMode'
    colorPrimary?: string
    colorText?: string
    colorLabel?: string
    hideLogo?: boolean
    inputType?: 'minimalMode' | 'flatMode'
  }
  callbacks: {
    onCreateTokenSucceeded: (token: ConektaTokenSuccess) => void
    onCreateTokenError: (error: ConektaTokenError) => void
    onGetInfoSuccess?: (loadingTime: unknown) => void
    onUpdateSubmitTrigger?: (submitFunction: () => void) => void
  }
}

declare global {
  interface Window {
    ConektaCheckoutComponents?: {
      Card: (params: ConektaCardComponentConfig) => void
    }
  }
}
