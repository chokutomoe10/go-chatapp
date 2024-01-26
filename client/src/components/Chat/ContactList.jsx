import { Box, Divider, Text } from '@chakra-ui/react'

const ContactList = (contacts, sendMessage) => {
    const contactList = contacts.map(c => {
        const ts = new Date(c.last_activity * 1000);

        return (
            <div key={c.username}>
                <Box as='button' p={2} borderColor={'-moz-initial'} borderBottomColor={'whiteAlpha.500'} mt={2} borderRadius={20} mb={2} textAlign={'left'} key={c.username} onClick={() => sendMessage(c.username)}>
                    <Text>{c.username}</Text>
                    <Text as={'sub'}>
                        {' '}
                        {ts.toDateString()}{' '}
                    </Text>
                </Box>
                <Divider></Divider>
            </div>
        );
    });

    return contactList;
}

export default ContactList;