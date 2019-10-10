import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Text, Item, Input, Form, Label, Thumbnail, Icon } from 'native-base';

import toonImg from '../Component/img/toon.jpg'


export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            icon: "eye-off",
            username: '',
            password: null,
            pass: true,
            isDisable: true
        }
    }

    eyeIcon = () => {
        this.setState(before => ({
            icon: before.icon === 'eye' ? 'eye-off' : 'eye',
            pass: !before.pass
        }))
        console.log(this.state.icon);
        console.log(this.state.pass);
    }

    userValidation = (username) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(username) == true && this.state.password != null) {
            this.setState({
                username: username,
                isDisable: false
            })
        } else {
            this.setState({
                username: username,
                isDisable: true
            })
        } this.setState({
            username,
        })
    }

    passValidation = (password) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (password != null == true && reg.test(this.state.username) == true) {
            this.setState({
                password: password,
                isDisable: false
            })
        } else {
            this.setState({
                password: password,
                isDisable: true
            })
        } this.setState({
            password,
        })
    }

    signInClick = () => {
        console.log(`${this.state.username} && ${this.state.password}`)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.logo}>
                    <Thumbnail large source={toonImg} />
                    <Text style={styles.textLogo}> LOG IN  </Text>
                    <Text style={styles.textLogo2}> Login with Your Webtoon Account !!  </Text>
                </View>

                <Form style={styles.formlogin}>
                    <Item floatingLabel>
                        <Label style={styles.textLabel}> E-Mail </Label>
                        <Input
                            onChangeText={username => this.userValidation(username)}
                        />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.textLabel}> Password </Label>
                        <Input
                            secureTextEntry={this.state.pass}
                            onChangeText={password => this.passValidation(password)}
                        />
                        <Icon name={this.state.icon} onPress={() => this.eyeIcon()} />
                    </Item>

                    <Button
                        success
                        disabled={this.state.isDisable}
                        rounded block style={styles.btnsign}
                        onPress={() => this.props.navigation.navigate('ForYou')}
                    >
                        <Text style={{ justifyContent: 'center' }}> Sign In Here </Text>
                    </Button>
                </Form>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#38D40A",

    },
    logo: {
        marginTop: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogo: {
        marginTop: 10,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    textLogo2: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },

    textLabel: {
        color: 'white',
        fontWeight: 'bold',
    },

    formlogin: {
        marginTop: 5,
        marginHorizontal: 25
    },
    btnsign: {
        marginTop: 30,
    }
});