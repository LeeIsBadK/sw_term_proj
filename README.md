# Tax Management App

A React Native-based tax management app that allows users to log in, view tax-related data, calculate personal income tax, and consult with an AI chatbot for tax-related questions. The app integrates local AI using an Ollama server and is designed for users in Thailand, with features specific to the Thai tax system.

(DISCLAMER: This is prototype for decribe how low-level design should be, And the possible implementation of this software)
This Project assigned by 2301367 Software Engineering Methodology and Development @Chula

## Table of Contents

- [Features](#features)
- [Screens](#screens)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- **Tax Calculation**: Calculate personal income tax (ภ.ง.ด. 94) based on various income and deduction categories.
- **AI Chatbot for Tax Consultation**: Consult with an AI chatbot on tax-related questions, powered by a local Ollama server.
- **User Authentication**: Log in and view tax-related data securely.
- **Customizable for Thai Tax Requirements**: Includes features tailored to Thai tax regulations.

## Screens

1. **Login Screen**: Allows users to log in to access the app.
2. **Home Screen**: Displays an overview of the user's tax data.
3. **Tax Calculator**: Provides an interface for calculating personal income tax.
4. **AI Chatbot**: A chat interface where users can ask tax-related questions to an AI assistant.
5. **Exit Button**: Allows users to exit the chatbot and return to the Home screen.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LeeIsBadK/sw_term_proj.git
   cd sw_term_proj
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Ollama server**:
   - Install Ollama and make sure it is running on your local machine. (run `ollama serve`)
   - Verify that models are configured on the server for AI chatbot use.

4. **Run the app**:
   ```bash
   npm run web/ios/android
   ```

   Then run
   ```bash
   node proxy_server.js
   ```

## Configuration

1. **AI Chatbot Setup**:
   - The chatbot is powered by the Ollama server. Ensure that it is set up and accessible locally.
   - The `getTaxAnswer` function in `library/chatAI.js` handles API calls to Ollama.

2. **Run proxy server for ollama**:
   - For the reason Ollama can't call directly (CORS), we have to run node `proxy_server.js` to send http request to ollama
## Usage

- **Login**: Start by logging into the app to access tax management features.
- **Calculate Tax**: Use the Tax Calculator screen to calculate personal income tax based on income and deductions.
- **Chat with AI**: Open the AI Chatbot to ask tax-related questions. The AI will provide answers based on the Thai tax system.
- **Exit Chat**: Use the Exit button to leave the chatbot and return to the Home screen.

## Dependencies

- **React Native**: Framework for building the app.
- **Ollama**: Local server for running the AI chatbot.
- **React Navigation**: Manages app navigation.

Refer to `package.json` for a complete list of dependencies.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy tax managing!
```
