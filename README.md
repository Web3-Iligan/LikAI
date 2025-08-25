# LikAI: The Shrimp Farmer's Biosecurity Coach

## LikAI Web Application Overview

An AI-powered platform that translates the Philippine National Shrimp Industry Roadmap into simple, daily biosecurity action plans for shrimp farmers.

- **Personalized Biosecurity & GAqP Action Plans:** AI-generated, visual, step-by-step plans tailored to your farm's unique profile for clear GAqP compliance.
- **AI Coach & Knowledge Assistant:** Your 24/7 AI chatbot providing instant, expert, and contextual advice via text, voice, or photo input.
- **Smart Investment Guidance:** AI-driven recommendations for cost-effective farm upgrades, showing clear ROI to boost your profitability.
- **Practical Biosecurity Library:** A comprehensive, visual hub of GAqP-aligned guides and tutorials for continuous learning and problem-solving.

- **Offline Support:** Access your personalized plans and critical guides anytime, anywhere, even without an internet connection.
- **Mobile-Friendly UI:** An intuitive, visually clear interface designed for easy use on any smartphone, ensuring seamless navigation for all farmers.


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-org/likai.git
   cd likai
   ```

2. **Install dependencies:**
   - Use the DevContainer to create a container with the preconfigured installation. There should be a prompt in the editor in which you can install a Dev Container and open the project in the Container
   - Wait for the installation to finish.

3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and set your API keys (e.g., `OPENAI_API_KEY`).

4. **Run the development server:**
   - the project is configured to rely on the local dfx network to enable the icp internet identity authorization. Please head over to the Running on the Local DFX NETWORK section.


   ```sh
   # to be able to run the development server without errors, please use the commands below.

   npm run dfx:start # to start a local replica of the dfx network
   npm run dfx:deploy # to deploy the canisters on local
   # or
   yarn dfx:start
   yarn dfx:deploy

   # after the canisters are deployed, you can start the development server by using the commands below:
   
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

### Running on the Local DFX NETWORK

To run the project in a local dfx network, you can use the command below

- To install all the dependencies, simply run the following:

```sh
bash setup/install.sh
# or 
zsh setup/install.sh # if you are using zsh
```

To run the project locally, simply run the following:

```sh
bash setup/deploy_local.sh
# or 
zsh setup/deploy_local.sh # if you are using zsh
```

### API Endpoints

- `/api/generate-assessment-plan` – Generates biosecurity tasks based on farm data.
- `/api/generate-plan` – Creates detailed action plans for risk factors.
- `/api/generate-how-to` – Produces step-by-step guides for farm tasks.
- `/api/chat-how-to` – AI chat support for how-to guides.
- `/api/submit` - Allows submission of onboarding form data to be sent towards the AI

### Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

### License

This project is licensed under the [MIT LICENSE](LICENSE).
