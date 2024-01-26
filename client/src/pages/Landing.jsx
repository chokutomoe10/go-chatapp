import { Box, Button, Container, Stack, Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function Landing() {
    return (
        <Container maxW={'2xl'} mt={'3rem'} centerContent>
            <Box p="5" marginBlockEnd={5}>
                <Text fontSize={'3xl'} paddingBlockEnd={5}>
                    This is chat application written in Reactjs powered by Chakra UI component. It is using websocket for communication.
                </Text>
            </Box>
            <Box>
                <Stack direction={'row'} spacing={7}>
                    <Link to='register'>
                        <Button>
                            Register
                        </Button>
                    </Link>
                    <Link to='login'>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Container>
    )
}

export default Landing;