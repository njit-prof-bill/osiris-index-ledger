# Sprint Planning 1

## Technologies

### Environments & Infrastructure
- **Node.js**  
  JavaScript runtime environment used to build scalable server-side applications, APIs, and handle backend operations.

- **Docker**  
  Containerization tool for packaging applications and dependencies. Docker allows each component to run in isolated containers, helping avoid dependency issues and ensuring consistent development, testing, and deployment environments for all team members.

- **Redis**  
  In-memory data store used for data caching, state management, and quick data retrieval. Redis will serve as the primary storage for the Index Ledger, enabling tracking of deployed functions, their states, and associated metadata.

### Programming Languages & Extensions
- **TypeScript**  
  A typed superset of JavaScript that adds static typing, interfaces, and development tools (such as TypeScript Compiler (`tsc`) and ESLint combined with Prettier). TypeScript allows for defining clear interfaces and data models (e.g., API requests/responses and configurations).

- **Protobuf (Protocol Buffers)**  
  Protobuf allows defining API messages as `.proto` files, which act as schemas for data exchanges between services. Protobuf supports code generation in multiple languages, including TypeScript, allowing consistent data structures and type safety across the project.

- **protoc-gen-ts**  
  A Protobuf plugin that generates TypeScript code from `.proto` files, integrating Protobuf definitions seamlessly into TypeScript projects.

### Code Formatting Tools
- **Clang-format**  
  Code formatting tool that enforces consistent style across the codebase. It’s highly configurable and natively supports Protobuf files as well as JSON, helping maintain clean, readable, and consistent code.

- **Prettier**  
  Code formatting tool that applies consistent styles and layouts across JavaScript, TypeScript, and other file types. Prettier ensures that all team members follow the same formatting standards for an organized, readable codebase.

### Communication
- **gRPC**  
  A framework for efficient communication between distributed systems. gRPC enables services to call methods or functions on other services, even across different networks or servers, supporting both request-response and streaming communication patterns.

### Development Tools
- **NPM (Node Package Manager)**  
  Used to manage project dependencies, including installation, versioning, and updating libraries for Node.js.

- **Jest**  
  JavaScript testing framework used for testing JavaScript and TypeScript applications. In this project, Jest will support unit testing, integration testing, mocking external dependencies, and generating code coverage analysis reports.

### AI Assistance
- **ChatGPT**  
  Used for support with documentation, generating boilerplate code, code commenting, and accelerating understanding and implementation of unfamiliar technologies.

## List of Assignments
- **Julia Torres** (Lead Developer)  
  - API 1: Record Transaction Command
  - Project setup
  - Protobuf definitions

- **Angelo Sticca** (Developer)  
  - API 2: Update Transaction Command

- **Aidan Krenz** (Developer)  
  - API 3: Get Transaction Details
  - API 4: List Transactions

- **Carlos Sarzo** (Developer)  
  - API 5: Delete Transaction Command
  - API 6: Audit Ledger Command 

- **Dylan Dunsheath** (Developer)  
  - API 7: Search Transaction by User
  - API 8: Get Account Balance

- **Stephen Ordway** (Project Manager)  
  - API 9: Calculate Total Ledger Value Command
  - API 10: Verify Transaction Integrity Command

[Link to Trello](https://trello.com/b/7kNY44kX/team6)
