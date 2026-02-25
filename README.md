# pokemon App

A responsive React web application that lets you browse, filter, and explore Pokémon — built with the [PokéAPI](https://pokeapi.co/).

🔗 **Live Demo:** [https://pokemon-assesment.netlify.app/]

---

## Screenshots

List Page Image with Search and grid/List View toggle (Grid View)
![List Page](image.png)
List Page with Pagination (List View)
![alt text](image-1.png)
Detail Page
![alt text](image-2.png)
---

## Features

- **Pokémon List Page** — Browse all Pokémon in a clean, paginated layout
- **Filter** — Filter Pokémon by name or type
- **List / Grid View Toggle** — Switch between a compact list and a card grid layout
- **Pagination** — Navigate through Pokémon in manageable pages
- **Detail Page** — Click any Pokémon to view detailed stats, types, and info
- **Unit Tests** — Core components and logic are covered with unit tests

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Create React App) |
| Styling | Plain CSS |
| Data | [PokéAPI](https://pokeapi.co/) (REST) |
| Testing | Jest + React Testing Library |
| Deployment | Netlify |

---

## Setup Instructions

### Prerequisites

- Node.js v16 or higher
- npm v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/AravindAsvath/pokemon.git
cd pokemon

# Install dependencies
npm install

# Start the development server
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Running Tests

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

### Building for Production

```bash
npm run build
```

The optimised build will be in the `build/` folder, ready to deploy to Netlify.

---

## Deployment

This app is deployed on **Netlify** via continuous deployment from the main branch.

To deploy your own instance:

1. Push the repo to GitHub
2. Log in to [netlify.com](https://netlify.com) and click **Add new site → Import an existing project**
3. Connect your GitHub repo
4. Set the build command to `npm run build` and publish directory to `build`
5. Click **Deploy**

---

## Project Structure

```
package.json
README.md
public/
├── index.html
├── manifest.json
└── robots.txt
src/
├── App.css
├── App.js
├── index.css
├── index.js
├── reportWebVitals.js
└── __mocks__/
	└── react-router-dom.js
app/
├── AppProviders.js
├── router.js
├── features/
│   └── pokemon/
│       ├── __tests__/
│       │   ├── pokemonApi.test.js
│       │   ├── PokemonDetail.test.js
│       │   ├── PokemonFilter.test.js
│       │   └── PokemonList.test.js
│       ├── api/
│       │   └── pokemonApi.js
│       ├── components/
│       │   ├── PokemonCard.js
│       │   ├── PokemonDetail.js
│       │   ├── PokemonFilter.js
│       │   └── PokemonList.js
│       ├── hooks/
│       │   ├── usePokemonDetail.js
│       │   └── usePokemonList.js
│       └── styles/
│           └── pokemon.css
└── shared/
	├── components/
	   ├── ErrorMessage.js
	   └── SkeletonLoader.js
```

---

## Architectural Decisions

**PokéAPI over a custom backend** — Since Pokémon data is static and publicly available, using the PokéAPI directly from the frontend removed the need to build and maintain a backend entirely. This keeps the project simple and deployable as a pure static site.

**Client-side filtering and pagination** — Filtering and pagination are handled in the browser rather than via API query params. This avoids extra network requests on every filter change and gives an instant, snappy feel to the UI. The trade-off is that an initial batch of Pokémon data must be fetched upfront.

**Custom CSS over a UI library** — Plain CSS was chosen over libraries like Tailwind or Material UI to keep the bundle lean and avoid opinionated component constraints, which is especially useful for matching the Pokémon aesthetic freely.

**React Router for page navigation** — React Router handles navigation between the List and Detail pages, giving the app proper URL-based routing and allowing users to deep-link directly to a Pokémon's detail page.

**Custom hook (`usePokemon`)** — Data-fetching logic is extracted into a custom hook to keep page components clean and to make the fetching logic independently testable.

---

## Trade-offs

| Decision | Trade-off |
|---|---|
| Client-side filtering | Fast UX but requires fetching a larger initial dataset rather than querying per filter |
| Create React App | Easy setup and familiar tooling, but slower build times and less flexibility than Vite |
| Plain CSS | Full styling control with no overhead, but no utility classes or design tokens out of the box |
| No state management library | Keeps things simple for this scope, but would need Redux or Zustand if the app grew significantly |
| PokéAPI free tier | No auth needed, but rate limits apply — not suitable at high traffic scale |

---

## AI Usage

This project was built with assistance from **Claude (Anthropic)** as an AI coding assistant. AI was used for:

- Generating boilerplate component structure and custom hook scaffolding
- Writing and refining unit test cases
- Debugging CSS layout issues
- Improving code readability and suggesting cleaner patterns

All AI-generated code was reviewed, understood, and adapted before being committed. The architecture, feature decisions, and overall design direction were made by the developer.

---

## License

MIT