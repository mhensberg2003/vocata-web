<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">VOCATA-WEB</h1></p>
<p align="center">
	<em>Empowering conversations, one language at a time.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/mhensberg2003/vocata-web?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/mhensberg2003/vocata-web?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/mhensberg2003/vocata-web?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/mhensberg2003/vocata-web?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**Vocata-Web** is a dynamic language learning platform that leverages AI for engaging conversations and skill improvement. With features like real-time chat, translation, and summarization, it offers a seamless user experience. Ideal for language enthusiasts seeking interactive practice and feedback, Vocata-Web enhances language skills in a friendly and visually appealing environment.

---

## 👾 Features

|      | Feature         | Summary       |
| :--- | :---:           | :---          |
| ⚙️  | **Architecture**  | <ul><li>Utilizes **React** for frontend development</li><li>Integrates **Firebase** for authentication and analytics</li><li>Employs **OpenAI** for chat interactions</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Follows **React best practices** for component structure</li><li>Uses **@testing-library/jest-dom** for enhanced testing</li><li>Maintains **consistent coding style** across files</li></ul> |
| 📄 | **Documentation** | <ul><li>Includes detailed **`package.json`** and **`package-lock.json`** files for dependencies</li><li>Provides **CSS styling** documentation for global and component-specific styles</li><li>Offers **JSDoc comments** for key functions and components</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Integrates **ShaderGradientCanvas** for visually appealing backgrounds</li><li>Connects to **OpenAI API** for chat analysis and translation</li><li>Utilizes **Firebase** for user authentication and data storage</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Organizes components into **separate files** for reusability</li><li>Uses **React Router** for navigation between pages</li><li>Encourages **component encapsulation** for better maintainability</li></ul> |
| 🧪 | **Testing**       | <ul><li>Implements **unit tests** for critical components</li><li>Utilizes **@testing-library/react** for component testing</li><li>Ensures **test coverage** for key functionalities</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Optimizes **web vitals** using **web-vitals library**</li><li>Utilizes **React.lazy** for **code splitting** and lazy loading</li><li>Implements **Firebase Performance Monitoring** for tracking app performance</li></ul> |
| 🛡️ | **Security**      | <ul><li>Secures user data with **Firebase Authentication**</li><li>Protects API keys with **server-side handling**</li><li>Implements **HTTPS** for secure data transmission</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Manages dependencies using **npm** with **`package.json`** and **`package-lock.json`**</li><li>Includes libraries like **Three.js**, **Axios**, and **@shadergradient/react**</li><li>Ensures **dependency version consistency** for stability</li></ul> |

---

## 📁 Project Structure

```sh
└── vocata-web/
    ├── api
    │   ├── getApiKey.js
    │   └── getFirebaseConfig.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── 60fps-slower.gif
    │   ├── favicon.ico
    │   ├── globe-icon.png
    │   ├── index.html
    │   ├── logo.png
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   ├── robots.txt
    │   ├── translation.gif
    │   ├── translationstill.png
    │   ├── web_neutral_sq_SI@4x.png
    │   └── web_neutral_sq_SU@4x.png
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── components
        ├── css
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        └── setupTests.js
```


### 📂 Project Index
<details open>
	<summary><b><code>VOCATA-WEB/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td>- The `package-lock.json` file in the project structure defines the dependencies and their versions required for the "vocata-web" project<br>- It ensures that the project uses specific versions of libraries like React, Axios, and Firebase to maintain consistency and stability in the codebase architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/package.json'>package.json</a></b></td>
				<td>- Manages dependencies and scripts for the React project, ensuring smooth development and build processes<br>- Facilitates integration of libraries like Three.js and Firebase, enhancing the web application's functionality<br>- Maintains compatibility with various browsers and provides essential tooling for development.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/index.css'>index.css</a></b></td>
				<td>Define global typography styles for the project, ensuring consistent and readable text across all components.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/App.css'>App.css</a></b></td>
				<td>Define global styles for the application layout, including centering content, page transitions, logout link positioning, home container styling, Google button appearance, and loading animation effects.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/App.test.js'>App.test.js</a></b></td>
				<td>Tests the rendering of the 'learn react' link in the App component using @testing-library/react.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/setupTests.js'>setupTests.js</a></b></td>
				<td>- Enhances Jest testing capabilities by providing custom matchers for DOM node assertions<br>- Integrates '@testing-library/jest-dom' to enable more robust and intuitive testing of React components<br>- This setup file ensures efficient and effective testing practices within the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/App.js'>App.js</a></b></td>
				<td>- Facilitates language practice through engaging conversations<br>- Users select a language and topic to chat about, with an AI generating initial questions<br>- The system guides users to improve language skills in a friendly manner<br>- The interface transitions smoothly between setup and chat windows, enhancing the user experience.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/reportWebVitals.js'>reportWebVitals.js</a></b></td>
				<td>- Exports a function to report web vitals performance metrics by leveraging the web-vitals library<br>- The function takes a callback and measures Core Web Vitals like CLS, FID, FCP, LCP, and TTFB<br>- This enables tracking and analyzing key performance indicators for web applications.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/index.js'>index.js</a></b></td>
				<td>- Initialize Firebase app, fetch configuration, and render React app with Firebase services<br>- The code in src/index.js sets up Firebase app, fetches config, and initializes auth and analytics<br>- It then renders the React app with Firebase services, ensuring proper functioning and monitoring.</td>
			</tr>
			</table>
			<details>
				<summary><b>css</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/css/Home.css'>Home.css</a></b></td>
						<td>- Enhances the visual presentation of the Home Page by styling elements for a clean and user-friendly interface<br>- The CSS file defines layout, colors, and interactions to create a cohesive and engaging user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/css/Chat.css'>Chat.css</a></b></td>
						<td>- Defines styling for a chat interface, including message display, input fields, and interactive elements like translation and summarization buttons<br>- The CSS in this file structures the chat container, messages, input area, typing indicators, and various buttons<br>- It enhances user experience by providing a visually appealing and functional layout for a chat application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/css/SummaryPage.css'>SummaryPage.css</a></b></td>
						<td>- Define the styling for a summary page, including background, layout, and content presentation<br>- The CSS file structures elements such as the summary container, text formatting, mistake sections, and animations for a cohesive and visually appealing user interface.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>components</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/Logout.js'>Logout.js</a></b></td>
						<td>- Enables users to log out by signing out of the application using Firebase authentication<br>- Upon successful sign-out, the user is redirected to the homepage<br>- Any errors encountered during the logout process are logged for debugging purposes.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/SummaryPage.js'>SummaryPage.js</a></b></td>
						<td>- Generates a chat summary with grammar and vocabulary scores, highlighting common mistakes<br>- Utilizes OpenAI service to summarize chat content<br>- Displays loading indicator and interactive dropdown for mistakes<br>- Implements a visually appealing background using ShaderGradientCanvas<br>- Automatically redirects if chat data is missing.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/Login.js'>Login.js</a></b></td>
						<td>- Enables user authentication and login functionality using Firebase and Google sign-in<br>- Renders a visually appealing login interface with ShaderGradientCanvas<br>- Handles form submission, error display, and navigation to the main application page upon successful login<br>- Promotes a seamless user experience for accessing the platform.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/Home.js'>Home.js</a></b></td>
						<td>- The Home component in the codebase handles user authentication and navigation logic<br>- It checks if a user is logged in and redirects them to the appropriate page<br>- Additionally, it provides a visually appealing background using ShaderGradientCanvas<br>- The component encourages users to login or register to access the application's features.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/Register.js'>Register.js</a></b></td>
						<td>- Enables user registration and Google sign-in functionality with Firebase authentication<br>- Handles user input for email and password, displaying errors if any<br>- Navigates users to the 'vocata' page upon successful registration or sign-in<br>- Utilizes ShaderGradientCanvas for a visually appealing background<br>- Allows users to switch to the login page if they already have an account.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/ChatWindow.js'>ChatWindow.js</a></b></td>
						<td>- Facilitates real-time chat interactions with AI and users, managing message sending, translation, and summarization<br>- Dynamically updates messages and UI components based on user and AI responses, enabling seamless conversation flow<br>- Implements features like translation prompts and summary generation based on message count, enhancing user experience and interaction capabilities within the chat environment.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/LoadingAnimation.js'>LoadingAnimation.js</a></b></td>
						<td>- Generates a loading animation with a customizable message for the AI component<br>- Displays a GIF and text to indicate ongoing processing<br>- This component enhances user experience by providing visual feedback during AI computations.</td>
					</tr>
					</table>
					<details>
						<summary><b>ai</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/ai/OpenAIService.js'>OpenAIService.js</a></b></td>
								<td>- Enables communication with OpenAI API for chat, translation, and chat analysis<br>- Handles sending messages, translating text, and summarizing chat content<br>- Utilizes OpenAI models for various tasks, fetching API key securely<br>- Supports language translation, content summarization, and feedback extraction<br>- Facilitates interactive AI-powered conversations and language analysis within the project.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>firebase</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/src/components/firebase/auth.js'>auth.js</a></b></td>
								<td>- Enables Google sign-in authentication using Firebase in the project<br>- Fetches Firebase configuration, initializes Firebase app, and handles user authentication seamlessly<br>- The code promotes secure and efficient user authentication flow within the project's architecture.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- public Submodule -->
		<summary><b>public</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/public/index.html'>index.html</a></b></td>
				<td>- Defines the structure and content of the project's main HTML file, setting up essential metadata and links for a React web application<br>- It ensures proper display and functionality across devices, including mobile, by incorporating necessary elements like icons and descriptions<br>- The file serves as a foundation for the app's presentation and user experience.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/public/manifest.json'>manifest.json</a></b></td>
				<td>- Defines the manifest.json file in the public directory, specifying essential details for the React web application, such as the app's name, icons, start URL, display mode, theme color, and background color<br>- This file plays a crucial role in configuring the app's appearance and behavior when added to the project structure.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/public/robots.txt'>robots.txt</a></b></td>
				<td>- Define crawling permissions for search engines by configuring the robots.txt file in the public directory<br>- This file sets rules for web crawlers, specifying which pages they can access on the site.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- api Submodule -->
		<summary><b>api</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/api/getApiKey.js'>getApiKey.js</a></b></td>
				<td>- The `getApiKey.js` file provides a handler function to retrieve and return the OpenAI API key<br>- It ensures the presence of the key and responds with it if available, else returns an error message<br>- This code file plays a crucial role in securely accessing the OpenAI API within the project architecture.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/mhensberg2003/vocata-web/blob/master/api/getFirebaseConfig.js'>getFirebaseConfig.js</a></b></td>
				<td>- Expose Firebase configuration data through an API endpoint to enable client-side integration<br>- The code retrieves environment variables for Firebase settings and returns them in a structured format<br>- If the configuration is missing, an error response is sent<br>- This functionality facilitates seamless communication between the frontend and Firebase services.</td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---
## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with vocata-web, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm


### ⚙️ Installation

Install vocata-web using one of the following methods:

**Build from source:**

1. Clone the vocata-web repository:
```sh
❯ git clone https://github.com/mhensberg2003/vocata-web
```

2. Navigate to the project directory:
```sh
❯ cd vocata-web
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




### 🤖 Usage
Run vocata-web using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


### 🧪 Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---
## 📌 Project Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/mhensberg2003/vocata-web/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/mhensberg2003/vocata-web/issues)**: Submit bugs found or log feature requests for the `vocata-web` project.
- **💡 [Submit Pull Requests](https://github.com/mhensberg2003/vocata-web/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/mhensberg2003/vocata-web
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/mhensberg2003/vocata-web/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=mhensberg2003/vocata-web">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 🙌 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
