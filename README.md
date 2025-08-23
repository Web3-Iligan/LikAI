# LikAI

**LikAI** is a practical Aquaculture Intelligence platform designed for the realities of smallholder shrimp farming. It provides farmers with a simple, AI-powered coaching app that turns complex Good Aquaculture Practices (GAqP) into a manageable, daily action plan. The platform's core mission is to help farmers build resilient, disease-resistant operations and generate the auditable compliance reports needed to become trusted, high-value suppliers to processors and exporters.

## Impact and Future potentials

**LikAI** has the potential to revolutionize shrimp farm management, de-risk the aquaculture supply chain, and establish a new standard for industry data intelligence. By making expert-level biosecurity simple and accessible, it can drive the widespread adoption of the sustainable and resilient farming practices called for in the National Shrimp Industry Roadmap. Future developments include launching the processor-facing analytics dashboard, expanding the platform to support other high-value species like crabs and fish, and offering data-driven insights to financial institutions and government agencies.

<br>
## Features

- **Personalized Farm Assessment:** 
   - Step-by-step onboarding flow collects farm data and generates a custom biosecurity report.
- **Actionable Recommendations:** 
   - AI-powered suggestions for pond care, stock sourcing, farm access control, and disease readiness.
- **Interactive How-To Guides:** 
   - Visual and checklist-based guides for key farm tasks, with integrated AI chat support.
- **Progress Tracking:** 
   - Dashboard to monitor completion of biosecurity tasks and overall farm health.
- **Compliance & Certification:** 
   - Automated compliance reports for BFAR accreditation and export standards.
- **Offline Access:** 
   - Downloadable PDF reports for field reference.
- **AI-Powered Assessment and Chatbot:** 
   - Personalized biosecurity plans and 24/7 AI coaching. See [docs/ai-features.md](docs/ai-features.md) for details.

<br>

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

<br>

## Running on the Local DFX NETWORK

**To run the project in a local dfx network, you can use the command below**

- The project container is pre-configured to run the installation scripts, and the local links are not accessible if the codespaces are ran in the web.
- To Start, create a codespace of this repository, and make sure you run it on the VS Code Desktop 

```sh
npm run deploy:local
```

<br>

## Modules

- **Farm Setup Basics:** Legal, environmental, and infrastructure requirements.
- **Pond & Water Care:** Water quality management, pond preparation, aeration, and effluent handling.
- **Healthy Stock Sourcing:** Accredited hatchery sourcing, quarantine, and stocking protocols.
- **Farm Access Control:** Visitor management, disinfection stations, and equipment hygiene.
- **Disease Readiness:** Health monitoring, emergency response, and veterinary compliance.

See [docs/modules.md](docs/modules.md) and [docs/ai-features.md](docs/ai-features.md) for full module and AI details.

<br>

## Data Model

The system uses a multi-entity data model for farm, assessment, planning, and reporting. See [docs/onboarding-erd.md](docs/onboarding-erd.md) for the ERD and entity descriptions.

<br>

## API Endpoints

- `/api/generate-assessment-plan` – Generates biosecurity tasks based on farm data.
- `/api/generate-plan` – Creates detailed action plans for risk factors.
- `/api/generate-how-to` – Produces step-by-step guides for farm tasks.
- `/api/chat-how-to` – AI chat support for how-to guides.
- `/api/submit` - Allows submission of onboarding form data to be sent towards the AI

<br>

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

This project is licensed under the [MIT LICENSE](LICENSE).
