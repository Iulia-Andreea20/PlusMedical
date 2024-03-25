import '@styles/globals.css'

export const metadata = {
  title: 'PlusMedical',
  description: 'Help people finance their medical treatment.',
  keywords: ['plusmedical', 'health', 'finance', 'medical', 'treatment'],
}
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>

        </body>
        <main>
            {children}
        </main>
    </html>
  )
}

export default RootLayout