import { Db } from "./";
import { GroceryItem } from "../types/DataItem";

export const groceryItemsTableName = "GroceryItems";

export function createGroceryItemTableSync (db:  Db){
  db.execSync(`CREATE TABLE IF NOT EXISTS ${groceryItemsTableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`);
} 

export const addGroceryItem = (db:  Db, item: GroceryItem) => {
  db.runSync(`INSERT INTO ${groceryItemsTableName} (name) values ($name)`, { $name: item.name! });
};

export const deleteGroceryItem = (db:  Db, id: number) => {
  db.runSync(`DELETE FROM ${groceryItemsTableName} WHERE id = $id`, { $id: id});
};

export const updateGroceryItem = (db:  Db, item: GroceryItem) => {
  db.runSync(`UPDATE ${groceryItemsTableName} SET name = $name WHERE id =$id`, { $id: item.id, $name:item.name!});
};

export function getAllGroceryItems(db:  Db): GroceryItem[]{
  const statement = db.prepareSync( `SELECT * FROM ${groceryItemsTableName}`);
  try {
    const result =  statement.executeSync<GroceryItem>();
    const items:GroceryItem[] = [];
    for (const row of result) {
      items.push(row);
    }
    return items;
  } finally {
    statement.finalizeSync();
  }
};