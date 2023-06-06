# Queries and Mutations

Practice writing queries and mutations with React Query and displaying loading states, error states, and data. We will be using our own database of Pokémon, which is a subset of the [PokéAPI](https://pokeapi.co/).

## Setup

### 0. Cloning and installation
- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    ```sh
    cd queries-and-mutations
    npm i
    npm run dev
    ```
  </details>

### 1. Looking around

In this challenge, the Database, API Routes, and Client API functions are written for you. Take a look in `server/db`, `server/routes`, and `client/apis` to see what's there. The types are also written for you in `models`.

`routes.tsx` is rendering a single client-side route, `/pokemon`, which renders `<PokemonList>`

Visit [localhost:5173/](http://localhost:5173/) to see a list of three example Pokémon, click the buttons and note what they do. The <kbd>Save</kbd> and <kbd>Delete</kbd> buttons do not do anything yet besides logging a value. 

React Query is setup for you in `client/index.tsx`.

---

## Challenges

### 1. Fetching a list of Pokémon from the API
- [ ] As a user, I want to see a list of the first generation of Pokémon so that I can see what Pokémon there are

  - In `<PokemonList>` use `useQuery` and `fetchAllPokemon` to render a list of Pokémon (just the names)
  <details style="padding-left: 2em">
    <summary>More about fetching Pokémon</summary>
    
    - `fetchAllPokemon` takes a `generation` parameter, which is a number between 1 and 9, in this case, we want to fetch the first generation of Pokémon, so we can pass `1`
    - `useQuery` takes a key (a string) and a function that returns a promise (`fetchAllPokemon`, in this case) and returns an object with a `data` property, which will eventually contain data returned by the promise

    Read more about [keys](https://tanstack.com/query/latest/docs/react/guides/query-keys) and [queries](https://tanstack.com/query/latest/docs/react/guides/queries) in the [React Query docs](https://tanstack.com/query/latest/docs/react).
  </details>

### 2. Adding a loading state

- [ ] As a user, I want to see a loading state while the list of Pokémon is being fetched so that I know something is happening
  <details style="padding-left: 2em">
    <summary>More about loading states</summary>
    
    - `useQuery` returns an `isLoading` property that you can use to determine when to render a loading state
    - You can use the `<LoadingSpinner>` component to render a special pokéball loading spinner
  </details>

### 3. Adding an error state

- [ ] As a user, if something goes wrong while fetching the list of Pokémon, I want to see an error state so that I know something went wrong
  <details style="padding-left: 2em">
    <summary>More about error states</summary>
 
    - `useQuery` returns an `isError` (true or false), and `error` properties that you can use to render an error state

  </details>

### 4. Fetching a single Pokémon

- [ ] As a user, when I click on a Pokémon in the list, I want to see more information about that Pokémon so that I can learn more about it

  - In `<PokemonList>`, add a `<Link>` to each Pokémon that links to `/pokemon/:name`, where `:name` is the name of the Pokémon
  - In `<PokemonDetail>`, use `useQuery` and `fetchPokemon` to render the Pokémon's name, image, and types
  <details style="padding-left: 2em">
    <summary>More about Pokémon details</summary>
    
    Have a look in `models/pokemon.ts` at the `Pokemon` type to see what properties are available to you.
  </details>

  - In `<PokemonDetail>`, add loading and error states

### 5. Adding more data to `<PokemonDetail>`

- [ ] As a user, I want to see more information about the Pokémon so that I can learn more about it
  - In `<PokemonDetail>`, use `console.log` to see what the _actual_ API is returning
  - Choose some fields and add them to the `Pokemon` type in `models/pokemon.ts`
  - In `<PokemonDetail>`, render those new fields in some way of your choosing

----

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  TODO: possible stretch challenges might include:
    - moving `<PokemonList>` to `/generations/:generationId` and having `/` or `/search` be a dedicated search page
    - adding a search bar to `<PokemonList>` that filters the list of Pokémon
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=query-em-all)
