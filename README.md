# LikAI: The Shrimp Farmer's Biosecurity Coach

![LikAI Cover Photo](./public/likai-cover-page.png)

We're using AI to help Filipino shrimp farmers build resilient farms and secure future harvests. Our mission is to strengthen the entire Philippine aquaculture industry, one healthy farm at a time.

## Overview

An AI-powered platform that generates the critical data and drives the farmer compliance needed for processors to manage and de-risk their entire supply chain.

- **Personalized Biosecurity & GAqP Action Plans:** This is the engine that standardizes best practices across your entire, fragmented supply chain, ensuring every farmer is working towards your quality and compliance goals.

- **AI Coach & Knowledge Assistant:** Our AI Coach reduces costly farmer errors and provides 24/7 oversight, which leads to higher survival rates and a more reliable supply of shrimp for your business.

- **Smart Investment Guidance:** This feature removes the biggest barrier to compliance—cost. By guiding farmers to make affordable upgrades, we accelerate your network's journey to becoming 100% accreditation-ready.

- **Practical Biosecurity Library:** We provide a robust, always-on support system for your suppliers, reducing the burden on your field technicians and ensuring consistent practices even in remote areas.

## ICP Features used

- Canisters: Decentralized App & Data Hosting
- Internet Identity: Secure Farmer & Processor Login
- HTTP Outcalls: External AI & Real-World Data Integration
- Timers: Automated Farmer Reminders & Reports
- Asset Canister: Verifiable On-Chain Certifications

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
