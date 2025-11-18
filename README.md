1. Project Title
NextAUV— Autonomous Underwater Vehicle (AUV) Showcase & AI Companion
2. Problem Statement
Universities and research teams building AUVs often lack a single, polished public-facing portal
that combines an interactive visual showcase (3D animations / telemetry playback), searchable
technical documentation (reports, papers, datasheets), and AI-powered assistance for exploring
the project. This makes it harder for judges/assessors to quickly evaluate the technical depth,
and for sponsors and new team members to find relevant information.
NextAUV provides one place to: present the AUV with high-quality animations and interactive
demos; host technical reports; and add AI-driven features.
3. System Architecture
Flow:
Frontend (Next.js + React Three Fiber) → Backend API (Next.js API / Node) → Database
(MySQL via Prisma)
↓
Vector DB / Embeddings (Pinecone/Milvus)
↓
AI Services (OpenAI / Hugging Face)
Notes:
●
●
●
The backend handles user authentication, data management (CRUD operations),
uploads, long-running tasks (PDF chunking & embedding), telemetry parsing, and any
server-side AI calls.
Vector DB stores embeddings for RAG-based Q&A.
Auth & Roles: NextAuth.js or JWT. Roles: Admin, Contributor, Guest, Sponsor.
4. Project Contents
●
●
●
Homepage: Hero section with an interactive 3D AUV, quick facts, and calls-to-action
(CTA).
About / Team: A page detailing team members, the project timeline, and sponsors.
Technical Vault: A central repository for papers, CAD files, and schematics. All
documents are indexed for semantic search, with robust filtering, sorting, and
pagination options to easily navigate the content.
●
Telemetry Playback: A tool to upload mission logs and visualize the AUV's path
alongside sensor data charts.
●
AI Assistant: A chat interface for Q&A over all indexed technical documentation.
●
Admin Dashboard: A secure area for administrators to manage uploads, reports, users,
and trigger document re-embedding.
5. Key Features
●
Authentication & Authorization: Secure login with role-based access control (Admin,
Contributor, Guest).
●
Full CRUD using APIs: Comprehensive Create, Read, Update, and Delete functionality
for all core data models (e.g., reports, users, telemetry logs) managed through a
well-defined API.
●
Searching, Sorting, Filtering, Pagination: Advanced server-side controls for all
data-heavy views, ensuring efficient and user-friendly navigation of extensive document
lists and logs.
●
Upload & Manage Reports: A streamlined workflow for uploading and managing PDF
documents.
●
Semantic Search and RAG Q&A: AI-powered search and question-answering over the
entire document library.
●
3D AUV Interactive Showcase: A high-fidelity, interactive 3D model of the AUV built
with React Three Fiber.
●
Telemetry Upload & Playback: Visualization tools for mission data.
6. Tech Stack
Layer Tech
Frontend Next.js (App Router), React, React Three Fiber, TailwindCSS
Backend Node.js, Next.js API routes or Express, Prisma ORM
Database MySQL (Prisma)
Auth NextAuth.js or JWT
AI OpenAI for LLMs & embeddings, LangChain.js for orchestration,
Pinecone/Milvus for vectors
Hosting Vercel (frontend), Railway/Render (backend), S3-compatible storage
7. API Overview
The API will be structured around RESTful principles to manage resources.
●
●
●
Auth Endpoints:
○
POST /api/auth/login
○
POST /api/auth/register
○
GET /api/auth/session
Reports (CRUD with Data Navigation):
○
GET /api/reports: Fetches a paginated list of reports. Supports query parameters
for filtering (?status=published), sorting (?sortBy=createdAt&order=desc), and
searching (?q=kalman).
○
POST /api/reports: Creates a new report (upload).
○
GET /api/reports/:id: Fetches a single report by its ID.
○
PUT /api/reports/:id: Updates a report's metadata.
○
DELETE /api/reports/:id: Deletes a report.
AI Endpoints:
○
POST /api/ai/chat: Sends a query to the RAG-based AI assistant.
8. Implementation Plan
●
●
●
●
Week 1: Scaffold the Next.js project, set up Prisma with the MySQL database schema,
and build basic pages (Homepage, About). Implement authentication and user roles.
Week 2: Develop the CRUD API for reports. Build the upload flow, PDF viewer, and
connect to S3-compatible storage. Implement the list view with server-side searching,
filtering, and pagination.
Week 3: Integrate the 3D AUV model on the homepage using React Three Fiber, adding
basic interactivity.
Week 4: Build the backend pipeline for PDF chunking, vectorization, and storage in the
vector DB upon upload.
●
●
●
Week 5: Develop the AI Chat interface and the backend logic using LangChain.js to
connect to the LLM and vector DB for RAG.
Week 6: Implement the telemetry playback feature, including log parsing and
visualization with charts and path rendering.
Week 7: Final polishing, responsive design checks, writing tests, and creating a project
demo video
