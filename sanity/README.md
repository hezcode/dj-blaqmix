## Sanity Setup Notes

1. Create a Sanity project and dataset (`production`) in your Sanity account.
2. In your Sanity Studio project, add `eventType` to your schema:

```ts
import { defineConfig } from "sanity";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  projectId: "<your-project-id>",
  dataset: "production",
  schema: { types: schemaTypes },
});
```

3. Copy `.env.example` to `.env.local` in this Next.js project and set values.
4. Create and publish `event` documents from Sanity Studio.
