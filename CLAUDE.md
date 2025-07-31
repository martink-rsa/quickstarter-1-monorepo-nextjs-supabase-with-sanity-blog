## Components

- Components should be created in their own folders.

- Components must use PascalCase naming convention.

- Do not use barrel files.

- Use named exports for components.

- Colocate test, storybook and other relevant files with the component e.g:

```
/MyComponent/
/MyComponent/MyComponent.tsx
/MyComponent/MyComponent.stories.tsx
/MyComponent/MyComponent.test.tsx
```

- Each component should have a unit test where possible.

- Each UI component should have a snapshot taken for it.

- Each UI component should have an image screenshot taken of it.

- Each UI component should have a Storybook story written for it.

## Tests

- Component unit tests and snapshots should be colocated with the component.
