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
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```
  </details>

### 1. Looking around

In this challenge, the Database, API Routes, and Client API functions are written for you. Take a look in `server/db`, `server/routes`, and `client/apis` to see what's there. The types are also written for you in `models`.

`routes.tsx` is rendering a single client-side route, `/pokemon`, which renders `<PokemonList>`. The `index` route is setup to automatically redirect to `/pokemon` using the `<Navigate>` component from `react-router-dom`.

Visit [localhost:5173/](http://localhost:5173/) to see a list of three example Pokémon, click the buttons and note what they do. The <kbd>Save</kbd> and <kbd>Delete</kbd> buttons do not do anything yet besides logging a value. 

React Query is setup for you in `client/index.tsx`.

---

## Challenges

### 1. Fetching a list of Pokémon from the API
- [ ] As a user, I want to see a list of the first generation of Pokémon so that I can see what Pokémon there are

  - In `<PokemonList>` use `useQuery` and `fetchAllPokemon` to render the list of Pokémon (just the names) in place of the hardcoded data
  - Add loading and error states while the list of Pokémon is being fetched or if something goes wrong (`<LoadingSpinner>` can be used for the loading state)

### 2. Deleting Pokémon

- [ ] As a user, when I click the delete button next to a Pokémon in the list, I want to remove it from the database

  - In `<PokemonListItem>`, there is a `handleDeleteClick` function, use `useMutation` and `deletePokemon` (from `apis/pokemon.ts`) to delete the pokémon from the database.
  - Use `queryClient.invalidateQueries` to refetch the list of Pokémon after deleting one
  <details style="padding-left: 2em">
    <summary>More about `useMutation` and invalidating queries</summary>

    Firstly, these documentation pages are very helpful:
    - [useMutation](https://tanstack.com/query/latest/docs/react/guides/mutations)
    - [Invalidating queries](https://tanstack.com/query/latest/docs/guides/query-invalidation)

    ```tsx
    const mutation = useMutation(someMutationFn, {
      onSuccess: () => {
        // this code runs when the mutation is successful
        // you can use queryClient.invalidateQueries here
      }
    })
    ```
  </details>

### 5. Renaming a Pokémon

- [ ] As a user, I want to rename a Pokémon so that I can give it a more fitting name

  - In `<PokemonListItem>`, there is an existing feature where a user can click `Rename`, and the name of the Pokémon will be replaced with a `form` where the user can type a new name and click `Save`
  - In `handleEditSubmit`, use `useMutation` and `renamePokemon` (from `apis/pokemon.ts`) to rename the pokémon in the database (Remember to use `queryClient.invalidateQueries` to refetch the list of Pokémon after renaming one)

----

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  - Add a delete button to `<PokemonListItem>` that deletes the Pokémon from the database
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=queries-and-mutations)
