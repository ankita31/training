
var dataset;
var DataType;
var createStatement = 'CREATE TABLE IF NOT EXISTS ankita(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age TEXT )';
var insertStatement = 'INSERT INTO ankita(name, age) VALUES (?,?)';
var updateStatement = 'UPDATE ankita SET name = ?, age = ? WHERE id=?';
var deleteStatement = 'DELETE FROM ankita WHERE id=?';
var dropStatement = 'DROP TABLE ankita';
var selectAllStatement = 'SELECT * FROM ankita';
var db;
var shortName = 'MyDatabase';
var version = '1.0';
var displayName = 'My Test Database Example';
var maxSizeInBytes = 65536;
db = openDatabase(shortName, version, displayName, maxSizeInBytes);



function createTable() {
       db.transaction(function(tx) {
        tx.executeSql(createStatement, [], showRecords, handleErrors);

    });
}

function insertRecord() {
    var name = $('#name').val();
    var age = $('#age').val();
    
    db.transaction(function(tx) {
        tx.executeSql(insertStatement, [name, age], loadAndReset, handleErrors);
    });
}

function deleteRecord(id) {
    
    db.transaction(function(tx) {
        tx.executeSql(deleteStatement, [id], showRecords, handleErrors);
        alert('Delete Sucessfully');
    });
    resetForm();
}

function updateRecord() {
    var name = $('#name').val();
    var age = $('#age').val();
    
    
    var id = $('#row_id').data('id');
    
    db.transaction(function(tx) {
        tx.executeSql(updateStatement, [name, age,id], loadAndReset, handleErrors);
        
    });
}

function dropTable() {
    db.transaction(function(tx) {
        tx.executeSql(dropStatement, [], showRecords, handleErrors);
    });

    resetForm();
    createTable();

}

function loadRecord(i) {
    
    var item = dataset.item(i);
    $('#name').val(item.name);
    $('#age').val(item['age']);
        $('#row_id').data('id',item['id']);
}

function resetForm() {
    $('#name').val('');
    $('#age').val('');
        $('#id').val('');
}

function loadAndReset() {
    resetForm();
    showRecords();
}

function handleErrors(transaction, error) {
    
    console.error('error ' + error.message);
    alert(error.message);
    return true;
}

function showRecords() {
 db.transaction(function(transaction) {
        transaction.executeSql(selectAllStatement, [], renderRecords, handleErrors);
    });
}

function renderRecords(transaction, results) {
    html = '';
    $('#results').html('');

    dataset = results.rows;
    var html;
    if (dataset.length > 0) {
        html+= '<br/><br/>';

        html+= '<table class="table table-bordered">';
        html+= '  <caption>Row inserted</caption>';
        html+='  <thead>';
        html+='    <tr>';
        html+= '      <th class="span1">Id</td>';
        html+= '      <th class="span2">name</td>';
        html+='      <th class="span2">age</td>';
       
        html+= '      <th class="span1">Actions</td>';
        html +='    </tr>';
        html += '  </thead>';

        html+= '  <tbody>';

        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);

            html +='    <tr>';
            html += '      <td>' + item['id'] + '</td>';
            html += '      <td>' + item['name'] + '</td>';
            html += '      <td>' + item['age'] + '</td>';
            
            html += '      <td>';
            html += '        <a href="#" onclick="loadRecord(' + i + ')">edit</a></li>';
            html += '        <a href="#" onclick="deleteRecord('+item['id']+')">delete</a></li>';                                      

            html +='      </td>';
            html +='    </tr>';
        }

        html += '  </tbody>';
        html += '</table>';
        
        $('#results').append(html);
    }
}


$(document).ready(function() {
    createTable();
    
});

