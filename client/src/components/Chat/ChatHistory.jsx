import { Box, Text, Container } from "@chakra-ui/react";
// import './Chat.css'

const ChatHistory = (currentUser, chats) => {
    const history = chats.map(m => {
        let margin = '0%';
        let bgColor = 'darkgray';
        let textAlign = 'left';

        if (m.from === currentUser) {
            margin = '20%';
            bgColor = 'teal.400';
            textAlign = 'right';
        }

        const ts = new Date(m.timestamp * 1000)

        return (
            <Box key={m.id} textAlign={textAlign} w={'80%'} p={2} my={2} ml={margin} bg={bgColor} borderRadius={20}>
                <Text>{m.message}</Text>
                <Text as={'sub'}>
                    {' '}
                    {ts.toUTCString()}{' '}
                </Text>
            </Box>
        );
    });

    return <Container>{history}</Container>
};

export default ChatHistory;