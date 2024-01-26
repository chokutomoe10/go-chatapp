import { Box, Heading, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ChatIcon } from '@chakra-ui/icons'

function Header() {
    return (
        <Box paddingBottom={5}>
            <Center>
                <Link to="/">
                    <Heading>
                        <ChatIcon/> Chat Application
                    </Heading>
                </Link>
            </Center>
        </Box>
    );
}

export default Header;