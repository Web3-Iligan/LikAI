# LikAI: The Adaptive Biosecurity Coach

![LikAI Cover](public/cover-photo.png)

LikAI is an AI-driven biosecurity coach designed for small and medium-sized shrimp farmers. It transforms complex GAqP (Good Aquaculture Practices) into personalized, adaptive, and affordable action plans, empowering farmers to build resilient operations and secure profitable harvests.

<br>

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Acknowledgements](#acknowledgements)

<br>

## Features

- **Personalized Farm Assessment:** Step-by-step onboarding flow collects farm data and generates a custom biosecurity report.
- **Actionable Recommendations:** AI-powered suggestions for pond care, stock sourcing, farm access control, and disease readiness.
- **Interactive How-To Guides:** Visual and checklist-based guides for key farm tasks, with integrated AI chat support.
- **Progress Tracking:** Dashboard to monitor completion of biosecurity tasks and overall farm health.
- **Compliance & Certification:** Automated compliance reports for BFAR accreditation and export standards.
- **Offline Access:** Downloadable PDF reports for field reference.
- **AI-Powered Assessment and Chatbot:** Personalized biosecurity plans and 24/7 AI coaching. See [docs/ai-features.md](docs/ai-features.md) for details.

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

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Running on the Local DFX NETWORK

**To run the project in a local dfx network, you can use the command below**
   - The project repository uses Dev Containers. Please install the Windows Subsystem for Linux beforehand as well as the ubuntu distro. Make sure that is running at a version later than 22.04

   ```sh
   npm run deploy:local


## Usage

- **Onboarding:** Start with the farm assessment to receive a personalized action plan.
- **Dashboard:** Track your farm’s biosecurity progress and get priority actions.
- **How-To Guides:** Access step-by-step instructions for farm tasks, with AI chat for troubleshooting.
- **Reports:** Download compliance and progress reports for certification and record-keeping.

## Modules

- **Farm Setup Basics:** Legal, environmental, and infrastructure requirements.
- **Pond & Water Care:** Water quality management, pond preparation, aeration, and effluent handling.
- **Healthy Stock Sourcing:** Accredited hatchery sourcing, quarantine, and stocking protocols.
- **Farm Access Control:** Visitor management, disinfection stations, and equipment hygiene.
- **Disease Readiness:** Health monitoring, emergency response, and veterinary compliance.

See [docs/modules.md](docs/modules.md) and [docs/ai-features.md](docs/ai-features.md) for full module and AI details.

## Data Model

The system uses a multi-entity data model for farm, assessment, planning, and reporting. See [docs/onboarding-erd.md](docs/onboarding-erd.md) for the ERD and entity descriptions.

## API Endpoints

- `/api/generate-assessment-plan` – Generates biosecurity tasks based on farm data.
- `/api/generate-plan` – Creates detailed action plans for risk factors.
- `/api/generate-how-to` – Produces step-by-step guides for farm tasks.
- `/api/chat-how-to` – AI chat support for how-to guides.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
