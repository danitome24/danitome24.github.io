## Tech Stack

- Next.js 16 (React 19)
- TypeScript 5
- Tailwind CSS 4 with PostCSS
- MDX for blog content
- ESLint for code quality

## Available Scripts

| Command         | Purpose                                  |
| --------------- | ---------------------------------------- |
| `pnpm install`  | Install dependencies                     |
| `pnpm dev`      | Start Next.js dev server with hot reload |
| `pnpm build`    | Build for production                     |
| `pnpm start`    | Start production server                  |
| `pnpm lint`     | Run ESLint on all files                   |
| `pnpm lint:fix`  | Auto-fix linting issues                   |

## Making Changes

### Adding Blog Posts

1. Create a new MDX file in `app/blog/posts/`
2. Use frontmatter for metadata (title, date, description, etc.)
3. The site will automatically pick up and route the post

### Styling

- Use Tailwind CSS classes for all styling
- Global styles can be added to the root layout
- Component-specific styles should be co-located with components

### Code Quality

- Always run `pnpm lint` before committing
- Use `pnpm lint:fix` to auto-fix issues
- Follow the ESLint configuration (includes Prettier for formatting)
