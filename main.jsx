import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { FlagProvider } from './context/flagContext.jsx'
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <FlagProvider>
      <App />
      </FlagProvider>
    </ApolloProvider>
  </StrictMode>,
)
