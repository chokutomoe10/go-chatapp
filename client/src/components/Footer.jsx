import { Box, Heading, Center } from "@chakra-ui/react";

function Footer() {
    return (
        <Box p={8}>
            <Center>
                <Heading size={'sm'}>Powered by Redis and Golang</Heading>
            </Center>
            <Center>
                <Heading size="sm">Chat Application</Heading>
            </Center>
        </Box>
    )
}

export default Footer;