import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCadastro = async () => {
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
    
        setLoading(true);
    
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
    
        try {
            const response = await axios({
                method: 'post',
                url: 'https://pi2univespsite.pythonanywhere.com/register_municipe/',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                setLoading(false);
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            } else {
                setLoading(false);
                setError('Erro ao cadastrar. Tente novamente.');
            }
        } catch (err) {
            setLoading(false);
            setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
            console.error('Erro de cadastro:', err.response ? err.response.data : err.message);
        }
    };
    
    return (
        <View style={styles.container}>
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

            {loading ? (
                <ActivityIndicator size="large" color="#0e1c36" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Já tem uma conta? Acesse</Text>
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
        width: '80%',
        height: undefined,
        aspectRatio: 3,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#0e1c36',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#FFF', // Sempre fundo branco
        fontSize: 16,
        color: '#333', // Sempre texto preto
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
    },
    button: {
        backgroundColor: '#0e1c36',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginLink: {
        color: '#007bff',
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default CadastroScreen;
