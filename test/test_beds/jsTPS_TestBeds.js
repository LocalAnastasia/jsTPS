import jsTPS from '.../src/jsTPS/jsTPS.js'
import changeListName_Transaction from '../demo/changeListName_Transaction'
import changeListOwner_Transaction from '../demo/changeListOwner_Transaction'
import modifyListItem_Transaction from '../demo/modifyListItem_Transaction'
import modifyListItems_Transaction from '../demo/modifyListItems_Transaction'
import todoList from '../demo/todoList'
import todoItem from '../demo/todoItem'

class jsTPS_TestBeds {

    testChangeListName() {

        tps = jsTPS();
        var list = todoList(0, 'Local Anastasia', 'Vincee', []);

        console.assert(list.getName() === 'Local Anastasia');

        // CHANGE LIST NAME TO CRAYON
        tps.addTransaction(new changeListName_Transaction(list, 'Crayon'));
        console.assert(list.getName() === 'Crayon');
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // CHANGE LIST NAME TO COLT
        tps.addTransaction(new changeListName_Transaction(list, 'Colt'));
        console.assert(list.getName() === 'Colt');
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // CHANGE LIST NAME TO LOCAL
        tps.addTransaction(new changeListName_Transaction(list, 'Local'));
        console.assert(list.getName() === 'Local');
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);
    }

    testChangeOwnerName() {

        tps = jsTPS();
        var list = new todoList(0, 'Local Anastasia', 'Vincee', []);

        console.assert(list.getOwner() === 'Vincee');

        // CHANGE LIST OWNER TO NICO
        tps.addTransaction(new changeOwnerName_Transaction(list, 'Nico'));
        console.assert(list.getOwner() === 'Nico');
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // CHANGE LIST OWNER TO LISBEN
        tps.addTransaction(new changeOwnerName_Transaction(list, 'Lisben'));
        console.assert(list.getOwner() === 'Lisben');
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // CHANGE LIST OWNER TO ANDRE
        tps.addTransaction(new changeOwnerName_Transaction(list, 'Andre'));
        console.assert(list.getOwner() === 'Andre');
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);
    }

    testModifyListItem() {
        tps = jsTPS();

        var items = [];
        for (var i = 0; i < 5; i++) {
            items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        }
        var list = new todoList(0, 'Local Anastasia', 'Vincee', items);

        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Escape DEMA");
        console.assert(list.getItem(3).getAssignedTo() === "Tyler");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === false);

        // CHANGE LIST ITEM AT INDEX 3
        var newItem = new todoItem(3, "Be A Bandito", "Josh", "2018-10-05", true);
        tps.addTransaction(new modifyListItem_Transaction(list, newItem));
        console.assert(list.getItem(3).getKey() === 3);
        console.assert(list.getItem(3).getDescription() === "Be A Bandito");
        console.assert(list.getItem(3).getAssignedTo() === "Josh");
        console.assert(list.getItem(3).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(3).getCompleted() === true);
        console.assert(tps.getSize() === 1);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 1);

        // CHANGE LIST ITEM AT INDEX 0
        newItem = new todoItem(0, "Sip On Chlorine", "Tyler", "2018-10-05", true);
        tps.addTransaction(new modifyListItem_Transaction(list, newItem));
        console.assert(list.getItem(0).getKey() === 0);
        console.assert(list.getItem(0).getDescription() === "Sip On Chlorine");
        console.assert(list.getItem(0).getAssignedTo() === "Tyler");
        console.assert(list.getItem(0).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(0).getCompleted() === true);
        console.assert(tps.getSize() === 2);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 2);

        // CHANGE LIST ITEM AT INDEX 4
        newItem = new todoItem(4, "Get Beat To Smithereens", "Tyler", "1988-12-01", true);
        tps.addTransaction(new modifyListItem_Transaction(list, newItem));
        console.assert(list.getItem(4).getKey() === 0);
        console.assert(list.getItem(4).getDescription() === "Sip On Chlorine");
        console.assert(list.getItem(4).getAssignedTo() === "Tyler");
        console.assert(list.getItem(4).getDueDate() === "2018-10-05");  
        console.assert(list.getItem(4).getCompleted() === true);
        console.assert(tps.getSize() === 3);
        console.assert(tps.getRedoSize() === 0);
        console.assert(tps.getUndoSize() === 3);  
    }

    testModifyListItems() {
        tps = jsTPS();

        var items = [];
        items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        items.push(new todoItem(i, "Escape DEMA", "Tyler", "2018-10-05", false));
        var list = new todoList(0, 'Local Anastasia', 'Vincee', items);
    }
}