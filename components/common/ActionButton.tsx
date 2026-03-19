import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ActionButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  className?: string
}

const buttonVariants = {
  primary: 'bg-[#000] text-white border-transparent hover:bg-[#000]',
  secondary:
    'bg-[#00000014] text-[#000] border-[#00000014] hover:bg-[#fff] backdrop-blur-2xl',
}

export default function ActionButton({
  children,
  variant = 'primary',
  icon,
  className,
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        'text-lg font-[430] inline-flex py-2.5 px-6 border rounded-full transition-all duration-150 ease-out items-center cursor-pointer',
        buttonVariants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </button>
  )
}
