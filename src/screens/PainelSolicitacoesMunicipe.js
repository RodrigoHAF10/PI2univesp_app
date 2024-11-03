import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

const PainelSolicitacoesMunicipe = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [foto, setFoto] = useState(null);
    const [tipoSolicitacao, setTipoSolicitacao] = useState('manutencao');
    const [prioridade, setPrioridade] = useState('minima');
    const colorScheme = useColorScheme(); // Detecta o tema do sistema

    const handleSelectImage = () => {
        launchImageLibrary({}, (response) => {
            if (!response.didCancel && !response.errorMessage) {
                const uri = response.assets[0].uri;
                setFoto(uri);
            }
        });
    };

    const handleSubmit = async () => {
        if (!nome || !endereco || !email || !mensagem || !foto) {
            Alert.alert('Erro', 'Preencha todos os campos e adicione uma foto.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('endereco', endereco);
            formData.append('email', email);
            formData.append('mensagem', mensagem);
            formData.append('imagem', {
                uri: foto,
                type: 'image/jpeg',
                name: 'foto.jpg',
            });
            formData.append('tipo_solicitacao', tipoSolicitacao);
            formData.append('prioridade', prioridade);
    
            const response = await axios.post('https://mean-pigs-start.loca.lt/api/solicitacoes/', formData, { // Atualize a URL aqui após a hospedagem
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                const solicitacaoId = response.data.id;
                navigation.navigate('SolicitacaoSucesso', {
                    id: solicitacaoId,
                    nome,
                    endereco,
                    tipoSolicitacao,
                    prioridade,
                    mensagem,
                    imagem: foto,
                });
            } else {
                Alert.alert('Erro', 'Erro ao enviar a solicitação.');
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
            Alert.alert('Erro', 'Erro ao enviar solicitação.');
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/images/prefeitura.png')} style={styles.logo} />
                <Text style={styles.title}>Guardiões Urbanos</Text>
                <Text style={styles.description}>Preencha os campos para solicitar um serviço.</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                            color: colorScheme === 'dark' ? '#FFF' : '#333',
                        },
                    ]}
                    placeholder="Seu Nome"
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor={colorScheme === 'dark' ? '#AAA' : '#666'}
                />
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                            color: colorScheme === 'dark' ? '#FFF' : '#333',
                        },
                    ]}
                    placeholder="Endereço"
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholderTextColor={colorScheme === 'dark' ? '#AAA' : '#666'}
                />
                <TextInput
                    style={[
                        styles.input,
                        {
                            backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                            color: colorScheme === 'dark' ? '#FFF' : '#333',
                        },
                    ]}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={colorScheme === 'dark' ? '#AAA' : '#666'}
                />
                
                <Text style={styles.label}>Mensagem:</Text>
                <TextInput
                    style={[
                        styles.textarea,
                        {
                            backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
                            color: colorScheme === 'dark' ? '#FFF' : '#333',
                        },
                    ]}
                    placeholder="Digite sua mensagem aqui..."
                    value={mensagem}
                    onChangeText={setMensagem}
                    multiline
                    numberOfLines={4}
                    placeholderTextColor={colorScheme === 'dark' ? '#AAA' : '#666'}
                />

                <Text style={styles.label}>Tipo de Solicitação:</Text>
                <Picker
                    selectedValue={tipoSolicitacao}
                    onValueChange={setTipoSolicitacao}
                    style={[
                        styles.picker,
                        { color: colorScheme === 'dark' ? '#FFF' : '#000' },
                    ]}
                >
                    <Picker.Item label="Manutenção" value="manutencao" />
                    <Picker.Item label="Melhoria" value="outra_opcao" />
                    <Picker.Item label="Reclamação" value="mais_uma_opcao" />
                </Picker>

                <Text style={styles.label}>Prioridade:</Text>
                <Picker
                    selectedValue={prioridade}
                    onValueChange={setPrioridade}
                    style={[
                        styles.picker,
                        { color: colorScheme === 'dark' ? '#FFF' : '#000' },
                    ]}
                >
                    <Picker.Item label="Mínima" value="minima" />
                    <Picker.Item label="Máxima" value="maxima" />
                </Picker>

                <TouchableOpacity style={styles.buttonBlue} onPress={handleSelectImage}>
                    <Text style={styles.buttonText}>Selecionar Foto</Text>
                </TouchableOpacity>

                {foto && <Image source={{ uri: foto }} style={styles.previewImage} />}

                <TouchableOpacity style={styles.buttonGreen} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
        color: '#000', 
    },
    formContainer: {
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    textarea: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        height: 100,
        textAlignVertical: 'top',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
    },
    previewImage: {
        width: '100%',
        height: 300,
        marginVertical: 20,
    },
    buttonBlue: {
        backgroundColor: '#0e1c36',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonGreen: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PainelSolicitacoesMunicipe;
