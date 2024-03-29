import React, { Component } from "react";
import axios from 'axios'
import { Container, Box, Stack, FormLabel, FormControl, Input, Button, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import {} from '@chakra-ui/icons'
import { Navigate } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            isInvalid: '',
            endpoint: 'http://localhost:8080/register',
            redirect: false,
            redirectTo: '/chat?u=',
        };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async e => {
        e.preventDefault();

        try {
            const res = await axios.post(this.state.endpoint, {
                username: this.state.username,
                password: this.state.password,
            });

            console.log('register', res);
            if (res.data.status) {
                const redirectTo = this.state.redirectTo + this.state.username;
                this.setState({ redirect: true, redirectTo });
            } else {
                this.setState({ message: res.data.message, isInvalid: true });
            }
        } catch (error) {
            console.log(error);
            this.setState({ message: 'something went wrong', isInvalid: true });
        }
    };

    render() {
        return (
            <div>
                {this.state.redirect && (
                    <Navigate to={this.state.redirectTo} replace={true}></Navigate>
                )}

                <Container marginBlockStart={10} textAlign={'left'} maxW={'2xl'}>
                    <Box borderRadius={'lg'} p={10} borderWidth={'2px'}>
                        <Stack spacing={5}>
                            <FormControl isInvalid={this.state.isInvalid}>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange}/>

                                {!this.state.isInvalid ? (
                                    <></>
                                ) : (
                                    <FormErrorMessage>{this.state.message}</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                                <FormHelperText>use a dummy password</FormHelperText>
                            </FormControl>
                            <Button type="submit" onClick={this.onSubmit}>
                                Register
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default Register;