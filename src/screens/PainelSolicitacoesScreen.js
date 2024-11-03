import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import PainelSolicitacoesMunicipe from '../screens/PainelSolicitacoesMunicipe';

const Stack = createStackNavigator();

// Tema customizado para forçar fundo branco e texto preto
const CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#ffffff', // fundo sempre branco
        text: '#000000', // texto sempre preto
    },
};

const AppNavigator = () => {
    return (
        <NavigationContainer theme={CustomTheme}>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} // Ocultando o cabeçalho
                />
                <Stack.Screen 
                    name="Registro" 
                    component={RegistroScreen} 
                    options={{
                        headerShown: true,
                        title: 'Registro',
                        headerStyle: { backgroundColor: '#ffffff' },
                        headerTintColor: '#000000',
                    }}
                />
                <Stack.Screen 
                    name="PainelSolicitacoes" 
                    component={PainelSolicitacoesMunicipe} 
                    options={{
                        title: 'Solicitações',
                        headerStyle: { backgroundColor: '#ffffff' },
                        headerTintColor: '#000000',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
