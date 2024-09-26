import { SQLiteDatabase, openDatabaseSync } from "expo-sqlite";
import { createGroceryItemTableSync } from "./GroceryItem";


export type Db = SQLiteDatabase;

export const db = openDatabaseSync('app.db');

createGroceryItemTableSync(db);