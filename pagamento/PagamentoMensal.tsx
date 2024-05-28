import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';

const accessToken = 'TEST-5281880692326025-052418-e9ccbd8084ff111a400ea68ad064fc79-388190566';

const PagamentoMensal: React.FC = () => {

  const handlePayment = async () => {
    const paymentData = {
      items: [
        {
          id: '1234',
          title: 'Plano Mensal',
          description: 'Assinatura mensal do serviço premium',
          category_id: 'subscription',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 20
        }
      ],
      back_urls: {
        success: 'http://test.com/success',
        failure: 'http://test.com/failure',
        pending: 'http://test.com/pending'
      },
      auto_return: 'all'
    };

    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(paymentData)
      });

      const responseData = await response.json();
      console.log('Pagamento criado:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Erro ao criar pagamento');
      }

      Alert.alert('Pagamento feito com sucesso!');
      
      if (responseData.init_point) {
        Linking.openURL(responseData.init_point).catch((err) => {
          console.error('Erro ao abrir o link:', err);
        });
      } else {
        console.error('init_point não encontrado na resposta:', responseData);
      }

 
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plano Mensal</Text>
      <Text style={styles.description}>Assinatura mensal do serviço premium</Text>
      <Text style={styles.price}>R$ 20,00</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Assinar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PagamentoMensal;
