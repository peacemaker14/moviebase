# **MovieBase**

MovieBase is a web application for browsing movie

---

## **Tech Stack**

- **Frontend**: React, Wouter, Tailwind CSS
- **State Management**: React Query
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library
- **Deployment**: Firebase Hosting

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/moviebase.git
   cd moviebase
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Add your **TMDb API Key**:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```env
     VITE_TMDB_API_URL=https://api.themoviedb.org/3
     VITE_TMDB_API_KEY=your_api_key_here
     ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Build for production:

   ```bash
   pnpm build
   ```

---

## **Usage**

- Visit the live application: [MovieBase](https://your-firebase-url.web.app)
- Use the search bar to find movies.
- Browse categories to discover top-rated, popular, and upcoming movies.

---

## **Testing**

Run tests to ensure the app is functioning correctly:

```bash
pnpm test
```
