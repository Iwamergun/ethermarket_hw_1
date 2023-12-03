
import { Providers } from './providers'
import { Navbar } from '../components/layouts/Navbar'



export const metadata = {
  title: 'wagmi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
         </Providers>
      </body>
    </html>
  )
}
