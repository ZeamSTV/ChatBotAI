import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const now = Date.now();
    if (now - lastRequestTime < 5000) { // Giới hạn gửi yêu cầu mỗi 5 giây
      Alert.alert('Please wait before sending another message.');
      return;
    }

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    setInput('');
    setIsLoading(true);
    setLastRequestTime(now);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-3.5-turbo-16k',
          prompt: input,
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-proj-gqEQ0q7S6HUbIBg2YlBMT3BlbkFJAOxuKas8aYrklQ1PT4tI',
          },
        }
      );

      const botMessage = { text: response.data.choices[0].text.trim(), sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        Alert.alert('You have sent too many requests. Please try again later.');
      } else {
        console.error('Error fetching OpenAI response:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {item.text}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={handleSend} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default App;
