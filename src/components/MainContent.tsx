interface MainContentProps {
  children: React.ReactNode; 
}

function MainContent({ children }: MainContentProps) {
  return (
    <main className="ml-60 px-6 pb-6 pt-4 md:ml-0">
      {children}
    </main>
  )
}

export default MainContent;