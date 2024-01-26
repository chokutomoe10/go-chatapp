import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <ChakraProvider>
      <Box>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/chat" element={<Chat/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
