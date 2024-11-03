import React from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SolicitacaoSucesso = ({ route, navigation }) => {
    const { id, nome, endereco, tipoSolicitacao, prioridade, mensagem, imagem } = route.params;

    const tipoSolicitacaoLabels = {
        manutencao: 'Manutenção',
        outra_opcao: 'Melhoria',
        mais_uma_opcao: 'Reclamação',
    };

    return (
        <View style={styles.container}>
            {/* Logo da Prefeitura */}
            <Image 
                source={require('../assets/images/prefeitura.png')} 
                style={styles.logo} 
            />

            <Text style={styles.title}>Solicitação Enviada com Sucesso!</Text>

            {/* Alterei o "ID" para "Nº de Chamado" */}
            <Text style={styles.label}>Nº de Chamado: {id}</Text>
            <Text style={styles.label}>Nome: {nome}</Text>
            <Text style={styles.label}>Endereço: {endereco}</Text>
            <Text style={styles.label}>Tipo de Solicitação: {tipoSolicitacaoLabels[tipoSolicitacao]}</Text>
            <Text style={styles.label}>Prioridade: {prioridade === 'minima' ? 'Mínima' : 'Máxima'}</Text>
            <Text style={styles.label}>Mensagem: {mensagem}</Text>

            {imagem && (
                <View style={styles.imageContainer}>
                    {/* Texto "Foto do Local" agora com a mesma cor e estilo que o título */}
                    <Text style={[styles.label, styles.boldText]}>Foto do Local:</Text>
                    <Image source={{ uri: imagem }} style={styles.image} />
                </View>
            )}

            {/* Botão de Voltar estilizado */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
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
        width: 300,   // Largura da logo
        height: 150,  // Altura da logo
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'Roboto',  // Fonte estilizada
        letterSpacing: 1,
        marginBottom: 20,
        textAlign: 'center',
        color: '#0e1c36',  // Cor mais escura
    },
    label: {
        fontSize: 20,  // Aumentei o tamanho da fonte
        fontFamily: 'Roboto',  // Fonte estilizada
        marginBottom: 10,
        color: '#2e2e2e',  // Cor mais escura para melhor legibilidade
        letterSpacing: 0.5,
    },
    boldText: {
        fontWeight: 'bold',  // Negrito aplicado para "Foto do Local"
        color: '#0e1c36',  // Mesma cor da frase "Solicitação Enviada com Sucesso!"
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#0e1c36',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Roboto',
    },
});

export default SolicitacaoSucesso;
