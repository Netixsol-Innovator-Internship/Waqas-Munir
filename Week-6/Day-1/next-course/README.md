## Next.js Basics

### Server Components vs Client Components

1. Server components

   - Components that are rendered on server side and then sent back to client side with filled content. It helps in better SEO

2. Client components
   - Client components are pre-rendered on server side, then hydrated on the client side.
   - Anything in client component that doesn't require interactivity is still rendered on the server

### Static Site Generation

- HTML pages are generated at build time. Content is generated when you deploy website, not when user requests it
- Very Fast, but not suitable for websites that needs frequently updated content
- Next.js uses it by default
- It is only suitable for documentations, blogs or marketing pages

### Incremental Static Generation

- Extension of SSG
- It builds the HTML page at build time but keeps updating the content after sometime

### Server Side Rendering

- HTML pages renders on page whenever user requests it, not on deployment time

### Partial Pre Rendering ( New Model )

- Combines Static & Dynamic Rendering
- Allows you to shell static shell of a page while streaming dynamic content
