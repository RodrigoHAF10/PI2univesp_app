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
    useColorScheme
} from 'react-native';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const colorScheme = useColorScheme();  // Detecta o tema do sistema

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
                url: 'https://mean-pigs-start.loca.lt/register_municipe/', // Atualize a URL aqui após a hospedagem
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
                style={[
                    styles.input,
                    {
                        backgroundColor: colorScheme === 'dark' ? '#333' : '#FFF',
                        color: colorScheme === 'dark' ? '#FFF' : '#333',
                    },
                ]}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colorScheme === 'dark' ? '#AAA' : '#666'}
            />
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colorScheme === 'dark' ? '#333' : '#FFF',
                        color: colorScheme === 'dark' ? '#FFF' : '#333',
                    },
                ]}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={colorScheme === 'dark' ? '#AAA' : '#666'}
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
        width: '80%',  // Define a largura como uma porcentagem para se adaptar à tela
        height: undefined,  // Permite que a altura seja ajustada automaticamente
        aspectRatio: 3,  // Proporção da imagem (3 de largura para 1 de altura)
        alignSelf: 'center',  // Centraliza a imagem
        resizeMode: 'contain',  // Ajusta a imagem para que caiba sem cortes
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
        backgroundColor: '#FFF', // Fundo branco
        fontSize: 16,
        color: '#333', // Texto preto
        elevation: 0, // Remove elevação em Android
        shadowOpacity: 0, // Remove sombra em iOS
        borderWidth: 0, // Remover bordas específicas que criem o relevo
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
