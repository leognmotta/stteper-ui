import * as React from 'react'

import {
  Step,
  StepperBody,
  StepperContent,
  StepperError,
  StepperHeader,
  StepperFooter,
} from './step'
import { StepperProvider } from './context'
import type { StepperContextProps } from './context'
import { cn } from '@/lib/utils'

interface StepperProps {
  initialStep?: number
  onClickStep?: (step: number, setStep: (step: number) => void) => void
  className?: string
}

const StepperRoot = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<StepperProps>
>((props, ref: React.Ref<HTMLDivElement>) => {
  const { initialStep = 0, onClickStep, className, children } = props

  const childArr = React.Children.toArray(children)
  const stepCount = childArr.filter((child) => {
    if (!React.isValidElement(child)) {
      throw new Error('Stepper children must be valid React elements.')
    }
    return child.type === StepperRoot
  }).length

  return (
    <StepperProvider
      initialStep={initialStep}
      onClickStep={onClickStep}
      stepCount={stepCount}
    >
      <div ref={ref} className={cn('flex flex-col gap-6', className)}>
        {React.Children.map(children, (child, i) => {
          const childProps = {
            index: i,
            isLastStep: i === stepCount - 1,
          }

          if (React.isValidElement(child)) {
            return React.cloneElement(child, childProps)
          }

          return null
        })}
      </div>
    </StepperProvider>
  )
})
StepperRoot.displayName = 'StepperRoot'

export const Stepper = {
  Root: StepperRoot,
  Item: Step,
  Body: StepperBody,
  Content: StepperContent,
  Error: StepperError,
  Header: StepperHeader,
  Footer: StepperFooter,
}
export type { StepperContextProps, StepperProps }
