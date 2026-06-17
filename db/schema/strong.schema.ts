import {
    sqliteTable,
    text,
    integer,
    real,
} from "drizzle-orm/sqlite-core";

/**
 * Base timestamps
 * stored as unix timestamps
 */

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const exercises = sqliteTable("exercises", {
    id: text("id").primaryKey(),

    name: text("name").notNull(),
    imageUrl: text("image_url"),
    description: text("description"),

    majorMuscleHit: text("major_muscle_hit").notNull(),
    exerciseCategory: text("exercise_category").notNull(),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

/**
 * Realm string[]
 */
export const exerciseMuscles = sqliteTable("exercise_muscles", {
    id: text("id").primaryKey(),

    exerciseId: text("exercise_id")
        .notNull()
        .references(() => exercises.id),

    muscle: text("muscle").notNull(),
});

export const workoutTemplates = sqliteTable("workout_templates", {
    id: text("id").primaryKey(),

    title: text("title").notNull(),
    notes: text("notes").notNull(),

    userId: text("user_id")
        .notNull()
        .references(() => users.id),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const workoutItemTemplates = sqliteTable(
    "workout_item_templates",
    {
        id: text("id").primaryKey(),

        workoutTemplateId: text("workout_template_id")
            .notNull()
            .references(() => workoutTemplates.id),

        exerciseId: text("exercise_id")
            .notNull()
            .references(() => exercises.id),

        numberOfSets: integer("number_of_sets").notNull(),

        createdAt: integer("created_at", {
            mode: "timestamp",
        }).notNull(),

        updatedAt: integer("updated_at", {
            mode: "timestamp",
        }).notNull(),
    }
);

export const workouts = sqliteTable("workouts", {
    id: text("id").primaryKey(),

    title: text("title").notNull(),
    notes: text("notes").notNull(),

    isFinished: integer("is_finished", {
        mode: "boolean",
    }).notNull(),

    finishedAt: integer("finished_at", {
        mode: "timestamp",
    }),

    userId: text("user_id")
        .notNull()
        .references(() => users.id),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const workoutItems = sqliteTable("workout_items", {
    id: text("id").primaryKey(),

    workoutId: text("workout_id")
        .notNull()
        .references(() => workouts.id),

    exerciseId: text("exercise_id")
        .notNull()
        .references(() => exercises.id),

    isDone: integer("is_done", {
        mode: "boolean",
    }).notNull(),

    notes: text("notes").notNull(),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const sets = sqliteTable("sets", {
    id: text("id").primaryKey(),

    workoutItemId: text("workout_item_id")
        .notNull()
        .references(() => workoutItems.id),

    exerciseId: text("exercise_id")
        .notNull()
        .references(() => exercises.id),

    rpe: integer("rpe").notNull(),

    setType: text("set_type").notNull(),

    weight: real("weight").notNull(),
    reps: integer("reps").notNull(),

    isDone: integer("is_done", {
        mode: "boolean",
    }).notNull(),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const measurements = sqliteTable("measurements", {
    id: text("id").primaryKey(),

    bodyPart: text("body_part").notNull(),

    measurement: real("measurement").notNull(),

    unit: text("unit").notNull(),

    userId: text("user_id")
        .notNull()
        .references(() => users.id),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const exerciseRecords = sqliteTable("exercise_records", {
    id: text("id").primaryKey(),

    recordType: text("record_type").notNull(),

    measurement: real("measurement").notNull(),

    unit: text("unit").notNull(),

    exerciseId: text("exercise_id")
        .notNull()
        .references(() => exercises.id),

    setId: text("set_id")
        .notNull()
        .references(() => sets.id),

    userId: text("user_id")
        .notNull()
        .references(() => users.id),

    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});