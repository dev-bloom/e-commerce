import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProductList from '@/components/product-list'
import Container from '@/components/layout/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Container>
      <ProductList />
    </Container>
  )
}
