import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        // Valida se os campos estão preenchidos
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
    
        try {
            // Requisição ao backend com a URL pública
            const response = await axios.post('https://mean-pigs-start.loca.lt/register_municipe/', { // Atualize a URL aqui após a hospedagem
                email: email,
                password: password
            });
    
            if (response.status === 201) {
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
                navigation.navigate('Login');  // Redireciona para a tela de login
            }
        } catch (error) {
            // Tratamento de erro vindo do servidor
            if (error.response && error.response.status === 400) {
                setError('E-mail já registrado ou dados inválidos.');
            } else {
                setError('Erro ao realizar o cadastro. Tente novamente.');
            }
        }
    };
    
    return (
        <View style={styles.container}>
            {/* Logo da Prefeitura */}
            <Image
                style={styles.logo}
                source={require('../assets/images/prefeitura.png')}
            />
            <Text style={styles.title}>Cadastro</Text>
            
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
    },
    logo: {
        width: 300,
        height: 100,
        alignSelf: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0e1c36',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#0e1c36',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroScreen;
