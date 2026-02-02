import { LucideIcon } from 'lucide-react'

export interface IDeliverableItem {
  title: string
  items: string[]
}

export interface IProcessStep {
  icon: LucideIcon
  title: string
  description: string
  deliverables: IDeliverableItem[]
}
