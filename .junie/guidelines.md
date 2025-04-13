📘 Zynapse Frontend — Project Guidelines for AI Assistants

You are assisting with the Zynapse React frontend project. Please follow these rules strictly when generating code,
suggestions, or documentation.

⸻

🚦 General Rules
• Always check and follow the latest official documentation for any libraries used.
• Code must be concise, readable, and modular.
• Avoid deprecated patterns, unused imports, and over-abstractions.
• Use double quotation marks (") for strings where possible.

⸻

⚛️ React
• Use React functional components only — no class components.
• Use hooks such as useState, useEffect, and useRef.
• Prefer custom hooks for reusable logic.
• Co-locate state with components unless global state is required.

⸻

🧭 React Router v7 (STRICT)
• Use react-router v7+ only, not react-router-dom.
• Use createBrowserRouter, RouterProvider, nested route definitions.
• Prefer useNavigate, useLoaderData, and createRoutesFromElements.
• Avoid legacy APIs such as <Switch> or useHistory.

⸻

🎨 Tailwind CSS v4 (STRICT)
• All styles must use Tailwind v4 utility classes.
• No styled-components, CSS modules, or inline styles.
• Use @apply only inside tailwind.css for shared utility styles.
• Prioritize mobile-first design using Tailwind’s responsive utilities.

⸻

🔧 API + State Management
• Use RTK Query for API calls.
• Avoid raw fetch or axios unless explicitly scoped.
• Use Redux Toolkit for global state (auth, cart, etc.).
• Do not use useContext for global state.

⸻

🔐 Authentication
• Assume Supabase Auth is used.
• Use built-in Supabase hooks such as useSession.
• Never manually manage JWT tokens — let Supabase handle auth state.

⸻

📁 Directory Structure

/src
/components # Shared, reusable UI components
/pages # Route-based page components
/services # API wrappers and integrations
/hooks # Custom React hooks
/store # Zustand or Redux state slices
/lib # Utilities, formatters, helpers
/routes # Route definitions
/assets # Static files, icons, images
/types # TypeScript interfaces and types

⸻

💬 Response Etiquette (AI Assistants)
• Explain file or code changes briefly and clearly.
• Provide context-aware recommendations.
• Remain consistent with this guideline unless explicitly overridden.

⸻

✅ Summary
• Stay updated with library docs.
• Be strict about React Router v7 and Tailwind CSS v4.
• Prefer double quotes for strings.
• Write modular, production-grade code.
• Treat these guidelines as the frontend contract.
