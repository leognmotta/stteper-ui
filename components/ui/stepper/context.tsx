'use client'

import * as React from 'react'

export interface StepperContextProps {
  initialStep: number
  stepCount: number
  onClickStep?: (step: number, setStep: (step: number) => void) => void

  activeStep: number
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
}

export const StepperContext = React.createContext<StepperContextProps>(
  {} as StepperContextProps,
)

const StepperProvider: React.FC<
  React.PropsWithChildren<
    Pick<StepperContextProps, 'initialStep' | 'stepCount' | 'onClickStep'>
  >
> = ({ children, initialStep, ...rest }) => {
  const [activeStep, setActiveStep] = React.useState(initialStep)

  const nextStep = () => {
    setActiveStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  const setStep = (step: number) => {
    setActiveStep(step)
  }

  return (
    <StepperContext.Provider
      value={{ initialStep, activeStep, nextStep, prevStep, setStep, ...rest }}
    >
      {children}
    </StepperContext.Provider>
  )
}
StepperProvider.displayName = 'StepperProvider'

export { StepperProvider }
