import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useStepper } from './use-stepper'
import { AlignJustify } from 'lucide-react'

interface InternalStepProps {
  index: number
  isLastStep?: boolean
}

const StepperBody: React.FC<React.PropsWithChildren> = (props) => {
  const { children, index = 0 } =
    props as React.PropsWithChildren<InternalStepProps>
  const { activeStep, onClickStep, setStep } = useStepper()
  const clickable = !!onClickStep

  return (
    <div
      data-active={index === activeStep}
      data-clickable={clickable}
      onClick={() => onClickStep?.(index, setStep)}
      className={cn(
        'border rounded-md p-3 flex items-center gap-2 w-full h-[54px]',
        'data-[active=true]:border-blue-700',
        'data-[clickable]:cursor-pointer',
      )}
    >
      {children}
    </div>
  )
}
StepperBody.displayName = 'StepperBody'

const StepperError: React.FC<
  React.PropsWithChildren<{ hasError?: boolean }>
> = ({ children, hasError = false }) => {
  return (
    <div data-error={hasError} className="data-[error=false]:opacity-0">
      {children}
    </div>
  )
}
StepperError.displayName = 'StepperError'

const StepperHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mr-4">{children}</div>
}
StepperHeader.displayName = 'StepperHeader'

const StepperContent: React.FC<React.PropsWithChildren<{ badge?: number }>> = ({
  children,
  badge,
}) => {
  return (
    <div className="flex gap-2">
      {badge && <Badge className="bg-slate-200 text-gray-400">{badge}</Badge>}
      <div className="line-clamp-1">{children}</div>
    </div>
  )
}
StepperContent.displayName = 'StepperContent'

const StepperFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-slate-200 px-2 py-1 rounded-md text-sm flex items-center gap-2 ml-auto w-[64px]">
      <AlignJustify className="w-4 h-4" />
      {children}
    </div>
  )
}
StepperFooter.displayName = 'StepperFooter'

const Step: React.FC<React.PropsWithChildren> = (props) => {
  const { children, ...rest } =
    props as React.PropsWithChildren<InternalStepProps>

  return (
    <div
      className={cn(
        'flex gap-2 items-center relative',
        "[&:last-child]:after:hidden after:content-[''] after:absolute after:bg-border after:w-[3px] after:h-6 after:-bottom-6 after:left-5",
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, rest)
        }
        return null
      })}
    </div>
  )
}

export {
  Step,
  StepperBody,
  StepperError,
  StepperHeader,
  StepperContent,
  StepperFooter,
}
