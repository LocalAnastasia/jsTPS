import AddToNum_Transaction from '../demo/AddToNum_Transaction'
import AndMask_Transaction from '../demo/AndMask_Transaction'
import OrMask_Transaction from '../demo/OrMask_Transaction'
import Num from '../demo/Num'
import jsTPS from '.../src/jsTPS/jsTPS'

class jsTPS_Unit_Tests {

    assertEquals(val1, val2) {
        console.assert(val1 == val2);
    }

    testAdd() {
        tps = new jsTPS();
        num = new Num();
        assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        assertEquals(5, num.getNum());
        assertEquals(1, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(1, tps.getUndoSize());
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        assertEquals(15, num.getNum());
        assertEquals(2, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(2, tps.getUndoSize());
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
    }
    testAndMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jsTPS();
        num = new Num();
        assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        assertEquals(4, num.getNum());
        assertEquals(2, tps.getSize());
        
        tps.undoTransaction();
        assertEquals(12, num.getNum());
        assertEquals(2, tps.getSize());
        assertEquals(1, tps.getRedoSize());
        assertEquals(1, tps.getUndoSize());

    }
    
    testOrMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jsTPS();
        num = new Num();
        assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 4));
        assertEquals(12, num.getNum());
        assertEquals(2, tps.getSize());
        
        tps.undoTransaction();
        assertEquals(12, num.getNum());
        assertEquals(2, tps.getSize());
        assertEquals(1, tps.getRedoSize());
        assertEquals(1, tps.getUndoSize());
    }

    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jsTPS();
        num = new Num();
        assertEquals(num.getNum(), 0);
        Assert.assertFalse(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        assertEquals(35, num.getNum());
        Assert.assertTrue(tps.hasTransactionToUndo());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertTrue(tps.hasTransactionToRedo());
        assertEquals(15, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(1, tps.getRedoSize());
        assertEquals(2, tps.getUndoSize());
        
        // UNDO ANOTHER
        tps.undoTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertTrue(tps.hasTransactionToRedo());
        assertEquals(5, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(2, tps.getRedoSize());
        assertEquals(1, tps.getUndoSize());
        
        // AND ANOTHER
        tps.undoTransaction();
        Assert.assertFalse(tps.hasTransactionToUndo());
        Assert.assertTrue(tps.hasTransactionToRedo());
        assertEquals(0, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(3, tps.getRedoSize());
        assertEquals(0, tps.getUndoSize());
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        Assert.assertFalse(tps.hasTransactionToUndo());
        Assert.assertTrue(tps.hasTransactionToRedo());
        assertEquals(0, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(3, tps.getRedoSize());
        assertEquals(0, tps.getUndoSize());
    }
        
        testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jsTPS();
        num = new Num();
        assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertTrue(tps.hasTransactionToRedo());
        assertEquals(15, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(1, tps.getRedoSize());
        assertEquals(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        Assert.assertTrue(tps.hasTransactionToUndo());
        Assert.assertFalse(tps.hasTransactionToRedo());
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
    }    

    testClear() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jsTPS();
        num = new Num();
        assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assertEquals(35, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        assertEquals(35, num.getNum());
        assertEquals(0, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assertEquals(70, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        assertEquals(70, num.getNum());
        assertEquals(0, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assertEquals(105, num.getNum());
        assertEquals(3, tps.getSize());
        assertEquals(0, tps.getRedoSize());
        assertEquals(3, tps.getUndoSize());
    }
}
