import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Footer, FooterTab, Icon, Text, View, Button, Card, CardItem } from 'native-base';

export default class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Profile',
            headerStyle: {
                backgroundColor: '#38D40A'
            },
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTintColor: '#fff',
            headerRight: (
                <Icon name="ios-create" style={{ color: 'white', marginRight: 15, }} onPress={() => navigation.navigate('EditProfile')} />
            ),

        };
    };

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ alignItems: 'center', marginVertical: 25 }}>

                        <TouchableOpacity>
                            <Image source={{ uri: 'https://scontent.fcgk18-2.fna.fbcdn.net/v/t1.0-9/59295453_2344405612271219_4234931757805207552_n.jpg?_nc_cat=106&_nc_oc=AQmHuXdCTwdvMLAu0usQA2HmYdeSaYoP0zGuS6sknXPH5XLakHTk_MXrgaHrDLTNwFM&_nc_ht=scontent.fcgk18-2.fna&oh=de7807752bca2dd3f8fb5caa93ce0333&oe=5E3A3839' }} style={styles.profImg} />
                        </TouchableOpacity>

                        <Text style={styles.profTxt}> Yusril Izza Aulia </Text>
                    </View>

                    <Card>
                        <CardItem header button onPress={() => this.props.navigation.navigate('MyCreation')}>
                            <Text style={{ fontWeight: 'bold' }}> My Webtoon Creation </Text>
                        </CardItem>
                        <CardItem footer button onPress={() => alert(" Thank You ")}>
                            <Text style={{ fontWeight: 'bold' }} > Log Out </Text>
                        </CardItem>
                    </Card>
                </Content>

                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button onPress={() => this.props.navigation.navigate('ForYou')} >
                            <Icon name="apps" style={styles.icon} />
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('FavScreen')}>
                            <Icon name="star" style={styles.icon} />
                        </Button>
                        <Button>
                            <Icon name="person" style={styles.icon} onPress={() => this.props.navigation.navigate('Profile')} />
                        </Button>
                    </FooterTab>
                </Footer>




            </Container>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#38D40A'
    },

    footer: {
        backgroundColor: '#38D40A',
    },

    icon: {
        color: 'white'
    },

    profImg: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#38D40A'
    },

    profTxt: {
        marginVertical: 15,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 18
    }

})