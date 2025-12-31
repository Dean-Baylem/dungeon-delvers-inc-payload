type Props = {
  children: React.ReactNode
}

export default function PageContents({ children }: Props) {
  return (
    <div
      className={`max-w-7xl w-[calc(100vw-2.5rem)] mx-auto border-t-4 border-b-4 border-heading shadow-[0_4px_4px_5px_rgba(0,0,0,0.25)] relative -mt-14`}
    >
      {children}
    </div>
  )
}
