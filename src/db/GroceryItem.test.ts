import { Db } from ".";
import { GroceryItem } from "../types/DataItem";
import { addGroceryItem, createGroceryItemTableSync, deleteGroceryItem, getAllGroceryItems, groceryItemsTableName, updateGroceryItem } from "./GroceryItem";

// Mocking the Db class and related methods
const mockDb = {
    execSync: jest.fn(),
    runSync: jest.fn(),
    prepareSync: jest.fn(),
  };
  
  // Mocking the prepareSync method to return an object with executeSync and finalizeSync
  const mockStatement = {
    executeSync: jest.fn(),
    finalizeSync: jest.fn(),
  };
  
  mockDb.prepareSync.mockReturnValue(mockStatement);

  
describe('createGroceryItemTableSync', () => {
  it('should execute the correct SQL to create the GroceryItems table', () => {
    const mockDb = { execSync: jest.fn() };

    createGroceryItemTableSync(mockDb as unknown as  Db);

    expect(mockDb.execSync).toHaveBeenCalledWith(
      `CREATE TABLE IF NOT EXISTS ${groceryItemsTableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`
    );
  });
});

describe('addGroceryItem', () => {
    it('should insert a grocery item into the GroceryItems table', () => {
      const mockDb = { runSync: jest.fn() };
      const mockItem: GroceryItem = { id: 1, name: 'Milk' };
  
      addGroceryItem(mockDb as unknown as  Db, mockItem);
  
      expect(mockDb.runSync).toHaveBeenCalledWith(
        `INSERT INTO ${groceryItemsTableName} (name) values ($name)`,
        { $name: 'Milk' }
      );
    });
  });


  describe('deleteGroceryItem', () => {
    it('should delete a grocery item from the GroceryItems table', () => {
      const mockDb = { runSync: jest.fn() };
      const mockId = 1;
  
      deleteGroceryItem(mockDb as unknown as  Db, mockId);
  
      expect(mockDb.runSync).toHaveBeenCalledWith(
        `DELETE FROM ${groceryItemsTableName} WHERE id = $id`,
        { $id: mockId }
      );
    });
  });


  describe('updateGroceryItem', () => {
    it('should update a grocery item in the GroceryItems table', () => {
      const mockDb = { runSync: jest.fn() };
      const mockItem: GroceryItem = { id: 1, name: 'Bread' };
  
      updateGroceryItem(mockDb as unknown as  Db, mockItem);
  
      expect(mockDb.runSync).toHaveBeenCalledWith(
        `UPDATE ${groceryItemsTableName} SET name = $name WHERE id =$id`,
        { $id: mockItem.id, $name: mockItem.name }
      );
    });
  });


  describe('getAllGroceryItems', () => {
    it('should return all grocery items from the GroceryItems table', () => {
      const mockDb = { prepareSync: jest.fn() };
      const mockStatement = {
        executeSync: jest.fn().mockReturnValue([
          { id: 1, name: 'Apples' },
          { id: 2, name: 'Bananas' }
        ]),
        finalizeSync: jest.fn(),
      };
      mockDb.prepareSync.mockReturnValue(mockStatement);
  
      const items = getAllGroceryItems(mockDb as unknown as  Db);
  
      expect(mockDb.prepareSync).toHaveBeenCalledWith(
        `SELECT * FROM ${groceryItemsTableName}`
      );
      expect(mockStatement.executeSync).toHaveBeenCalled();
      expect(mockStatement.finalizeSync).toHaveBeenCalled();
      expect(items).toEqual([
        { id: 1, name: 'Apples' },
        { id: 2, name: 'Bananas' }
      ]);
    });
  });