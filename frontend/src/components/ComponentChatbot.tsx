"use client"

import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import axios from 'axios';
import { useWeb3Auth } from '@/context/Web3AuthContext'; // Contexto de Web3Auth
import ethersRPC from '@/app/ethersRPC';
import { decryptMessages, encryptMessages } from '@/utils/encryption'; // Importar la función de encriptación
import "../public/Chatbot.css";

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function ComponentChatbot() {
  const { provider } = useWeb3Auth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageToSend = pdfFile ? 'PDF subido, enviando para procesar...' : input;

    if (messageToSend.trim()) {
      const userMessage: Message = { text: messageToSend, sender: 'user' };
      const newMessages = [...messages, userMessage];

      setMessages(newMessages);
      setInput('');
      setPdfFile(null);

      try {
        let response;

        if (pdfFile) {
          const formData = new FormData();
          formData.append('file', pdfFile);

          response = await axios.post('http://localhost:3001/api/process-pdf', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const botMessage: Message = { text: `Resumen del PDF:\n\n${response.data.summary}`, sender: 'bot' }
          setMessages([...newMessages, botMessage]);
        } else {
          response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
              contents: [
                {
                  parts: [
                    {
                      text: input,
                    },
                  ],
                },
              ],
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.data.candidates && response.data.candidates.length > 0) {
            const botResponse = response.data.candidates[0].content.parts[0].text;
            const botMessage: Message = { text: botResponse, sender: 'bot' }
            setMessages([...newMessages, botMessage])
          } else {
            const errorMessage: Message = { text: 'No se recibió respuesta válida del bot.', sender: 'bot' }
            setMessages([...newMessages, errorMessage])
          }
        }
        if (provider) {
          const address = await ethersRPC.getAccounts(provider);
          const encryptedMessages = encryptMessages(
            newMessages.map(msg => msg.text),
            address[0]
          );
          console.log("Mensajes encriptados:", encryptedMessages);
          const decryptedMessages = decryptMessages(encryptedMessages, address[0]);
          console.log("Mensajes desencriptados:", decryptedMessages);
        }
      } catch (error) {
        console.error("Error al encriptar los mensajes:", error);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPdfFile(file);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="chat-input"
        />
        <label htmlFor="file-upload" className="file-upload-label">
          <Paperclip />
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
        <button type="submit" className="send-button">
          <Send />
        </button>
      </form>
    </div>
  );
}
