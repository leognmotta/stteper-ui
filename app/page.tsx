'use client'

import {
  Activity,
  AlertCircle,
  AlignCenter,
  Volume2Icon,
  ArrowUpDown,
} from 'lucide-react'

import { Stepper } from '@/components/ui/stepper'

const data = [
  {
    id: 1,
    activities: 17,
    notifications: 8,
    type: 'b',
    description: 'Another description for testing',
    hasError: true,
  },
  {
    id: 2,
    activities: 29,
    notifications: 15,
    type: 'c',
    description: 'A brief description',
    hasError: false,
  },
  {
    id: 3,
    activities: 10,
    notifications: 5,
    type: 'a',
    description: 'Yet another description',
    hasError: true,
  },
  {
    id: 4,
    activities: 35,
    notifications: 20,
    type: 'b',
    description: 'A description with details',
    hasError: false,
  },
  {
    id: 5,
    activities: 19,
    notifications: 9,
    type: 'c',
    description: 'A description without details',
    hasError: true,
  },
  {
    id: 6,
    activities: 27,
    notifications: 14,
    type: 'a',
    description: 'Test description',
    hasError: false,
  },
]

export default function Home() {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'a':
        return <Activity className="w-4 h-4 text-orange-600" />
      case 'b':
        return <Volume2Icon className="w-4 h-4 text-orange-600" />
      case 'c':
        return <ArrowUpDown className="w-4 h-4 text-orange-600" />
      default:
        return <AlignCenter className="w-4 h-4 text-orange-600" />
    }
  }

  return (
    <main className="p-4 lg:p-24">
      <Stepper.Root onClickStep={(step, setStep) => setStep(step)}>
        {data.map((item) => (
          <Stepper.Item key={item.id}>
            <Stepper.Body>
              <Stepper.Header>{renderIcon(item.type)}</Stepper.Header>

              <Stepper.Content badge={item.activities}>
                {item.description}
              </Stepper.Content>

              {item.notifications > 8 && (
                <Stepper.Footer>{item.notifications}</Stepper.Footer>
              )}
            </Stepper.Body>

            <Stepper.Error hasError={item.hasError}>
              <AlertCircle className="w-6 h-6 text-red-600" />
            </Stepper.Error>
          </Stepper.Item>
        ))}
      </Stepper.Root>
    </main>
  )
}
