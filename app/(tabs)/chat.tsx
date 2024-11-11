import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import getTaxAnswer from '@/library/chatAI';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add state to track loading

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user's message
        setMessages((prevMessages) => [
            ...prevMessages,
            { user: 'User', text: input },
        ]);

        // Clear the input field
        setInput('');

        // Show "AI is responding" message
        setIsLoading(true);

        try {
            const response = await getTaxAnswer(input);
        
            // Check if the response is a valid JSON string
            if (typeof response === 'string' && response.trim().startsWith('{')) {
                try {
                    const parsedResponse = JSON.parse(response);
                    console.log("API Response:", parsedResponse);
        
                    // Access the content cautiously, handling potential errors
                    const content = parsedResponse.choices[0]?.message?.content;
                    if (content) {
                        console.log("Content response:", content);
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { user: 'AI', text: content },
                        ]);
                    } else {
                        console.warn("Invalid content format in API response");
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            { user: 'AI', text: content || 'No answer available due to an unexpected response format.' },
                        ]);
                    }
                } catch (parseError) {
                    console.error("Error parsing JSON response:", parseError);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { user: 'AI', text: 'Error parsing the response. Please try again.' },
                    ]);
                }
            } else {
                console.warn("Invalid response format:", response);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: 'AI', text: response },
                ]);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { user: 'AI', text: 'Error retrieving response. Please try again.' },
            ]);
        } finally {
            // Hide the "AI is responding" message once done
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat with AI</Text>
            <ScrollView style={styles.chatBox} contentContainerStyle={styles.chatBoxContent}>
                {messages.map((message, index) => (
                    <View key={index} style={styles.messageContainer}>
                        <Text style={styles.messageUser}>{message.user}:</Text>
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>AI is responding...</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder="Type your message here..."
                    placeholderTextColor="#888"
                />
                <View style={styles.sendButton}>
                    <Button title="Send" color={"#3FC385"} onPress={handleSend} />
                </View>
                <View style={styles.leaveButton}>
                    <Button title="Leave chat" color={"orange"} onPress={() => router.replace('/tabs/TaxScreen')} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'center',
    },
    chatBox: {
        width: '100%',
        height: '70%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    chatBoxContent: {
        paddingBottom: 20,
    },
    messageContainer: {
        marginBottom: 15,
    },
    messageUser: {
        fontWeight: 'bold',
    },
    messageText: {
        marginLeft: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        marginRight: 10,
    },
    sendButton: {
        padding: 10,
    },
    loadingContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    loadingText: {
        fontStyle: 'italic',
        color: '#888',
    },
    leaveButton: {
        padding: 10,
        color: '#f00',
    },
});

export default Chat;
