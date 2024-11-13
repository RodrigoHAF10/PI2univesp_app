import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError(''); // Reset error message

        try {
            const response = await axios.post('https://pi2univespsite.pythonanywhere.com/api/token/', 
            {   
                username: email,
                password: password,
            });
    
            if (response.status === 200) {
                navigation.navigate('PainelSolicitacoesMunicipe');
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    // Erro de autenticação
                    setError('E-mail ou senha incorretos.');
                } else {
                    // Outro erro no servidor (exemplo: erro 500)
                    setError('Erro no servidor. Tente novamente mais tarde.');
                }
            } else if (err.request) {
                // A requisição foi feita, mas sem resposta
                setError('Servidor sem resposta. Verifique sua conexão.');
            } else {
                // Outro erro na configuração da requisição
                setError(`Erro inesperado: ${err.message}`);
            }
            console.error("Erro de login:", err);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/images/prefeitura.png')}
            />
            
            <Text style={styles.title}>Guardiões Urbanos</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#666"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#666"
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {loading ? (
                <ActivityIndicator size="large" color="#0e1c36" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => navigation.navigate('Cadastro')}
            >
                <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                <Text style={styles.link}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    logo: {
        width: 300,
        height: 100,
        alignSelf: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0e1c36',
        marginBottom: 40,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#FFF',
        color: '#333',
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
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
        marginBottom: 15,
    },
    buttonSecondary: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#007bff',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
