import { createId } from '@paralleldrive/cuid2'
import { type InferSelectModel, relations } from 'drizzle-orm'
import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './auth'
import { likes } from './like'

const visibilities = ['public', 'private'] as const
export type Visibility = (typeof visibilities)[number]
export const visibilityEnum = pgEnum('visibility', visibilities)

export const posts = pgTable('post', {
  id: text('id').notNull().primaryKey().$defaultFn(createId),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content'),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at', { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3 }).notNull().defaultNow(),
  visibility: visibilityEnum('visibility').default('public').notNull()
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  likes: many(likes),
  user: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
}))

export type Post = InferSelectModel<typeof posts>
