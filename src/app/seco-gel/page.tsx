import SecomClient from './secoClient'

export const metadata = {
  title: 'seco gel for EA| sencergok.com',
  description: 'seco gel butonu — eğlencelik tıklama ve not kaydı.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function Page() {
  return <SecomClient />
}


