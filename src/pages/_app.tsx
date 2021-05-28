import { ChakraProvider, Stack } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import '../styles/globals.css'

interface AppProps {
  Component: FunctionComponent
  pageProps: any
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Stack w="100vw" h="100vh">
        <Component {...pageProps} />
      </Stack>
    </ChakraProvider>
  )
}

export default App
