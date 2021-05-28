import { ChakraProvider, Stack } from '@chakra-ui/react'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Stack w="100vw" h="100vh">
        <Component {...pageProps} />
      </Stack>
    </ChakraProvider>
  )
}

export default App
