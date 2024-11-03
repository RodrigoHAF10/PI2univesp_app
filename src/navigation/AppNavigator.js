import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';  // Tela de Cadastro
import PainelSolicitacoesMunicipe from '../screens/PainelSolicitacoesMunicipe';
import SolicitacaoSucesso from '../screens/SolicitacaoSucesso';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Cadastro" component={CadastroScreen} />
                <Stack.Screen name="PainelSolicitacoesMunicipe" component={PainelSolicitacoesMunicipe} />
                <Stack.Screen name="SolicitacaoSucesso" component={SolicitacaoSucesso} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
