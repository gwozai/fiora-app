import {
    Body,
    Button,
    Container,
    Content,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Toast,
} from 'native-base';
import React from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { useIsLogin } from '../../hooks/useStore';
import socket from '../../socket';
import action from '../../state/action';
import { removeStorageValue } from '../../utils/storage';

function Other() {
    const isLogin = useIsLogin();

    async function logout() {
        action.logout();
        await removeStorageValue('token');
        Toast.show({ text: '您已经退出登录' });
        socket.disconnect();
        socket.connect();
    }

    function login() {
        Actions.push('login');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Container>
                <Content>
                    <List>
                        <ListItem
                            icon
                            onPress={() => Linking.openURL('https://github.com/yinxin630/fiora')}
                        >
                            <Left>
                                <Icon name="github" style={{ fontSize: 25 }} type="AntDesign" />
                            </Left>
                            <Body>
                                <Text>源码</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
                {isLogin ? (
                    <Button danger block style={styles.logoutButton} onPress={logout}>
                        <Text>退出登录</Text>
                    </Button>
                ) : (
                    <Button block style={styles.logoutButton} onPress={login}>
                        <Text>登录 / 注册</Text>
                    </Button>
                )}
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 16,
    },
});

export default Other;
