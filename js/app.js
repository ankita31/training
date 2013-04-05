console.log("reached");
var dataset;
var DataType;
var createStatement = 'CREATE TABLE IF NOT EXISTS sneha(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, gender TEXT, address TEXT, remember TEXT )';
var insertStatement = 'INSERT INTO sneha(email, password,gender,address,remember) VALUES (?,?,?,?,?)';
var updateStatement = 'UPDATE sneha SET email = ?, password = ?,gender=?, address = ?, remember = ? WHERE id=?';
var deleteStatement = 'DELETE FROM sneha WHERE id=?';
var dropStatement = 'DROP TABLE sneha';
var selectAllStatement = 'SELECT * FROM sneha';
var db;
var shortName = 'MyDatabase';
var version = '1.0';
var displayName = 'My Test Database Example';
var maxSizeInBytes = 65536;
db = openDatabase(shortName, version, displayName, maxSizeInBytes);

/*
 function initDatabase()
 {
 console.debug('called initDatabase()');

 try {
 if (!window.openDatabase) {
 alert('not supported');
 } else {
 var shortName = 'MyDatabase';
 var version = '1.0';
 var displayName = 'My Test Database Example';
 var maxSizeInBytes = 65536;
 db = openDatabase(shortName, version, displayName, maxSizeInBytes);

 CreateTable();
 }
 } catch(e) {
 if (e == 2) {
 alert('Invalid database version');
 } else {
 alert('Unknown error ' + e);
 }
 return;
 }
 }*/

function createTable() {
    console.debug('called createTable()');
    db.transaction(function(tx) {
        tx.executeSql(createStatement, [], showRecords, handleErrors);
        console.debug('executeSql: ' + createStatement);
    });
}

function insertRecord() {
    var email = $('#email').val();
    var password = $('#password').val();
    var gender = $('input:radio[name=gender]:checked').val();
    console.log(gender);    
     var address = $('#address').val();
    /*var remember = $('#remember').val();*/
    var remember =$('#remember').is(':checked');
    db.transaction(function(tx) {
        tx.executeSql(insertStatement, [email, password, gender, address, remember], loadAndReset, handleErrors);
    });
}

function deleteRecord(id) {
    console.debug('called deleteRecord()');
    db.transaction(function(tx) {
        tx.executeSql(deleteStatement, [id], showRecords, handleErrors);
        console.debug('executeSql: ' + deleteStatement);
        alert('Delete Sucessfully');
    });
    resetForm();
}

function updateRecord() {
    console.debug('called updateRecord()');
    
    var email = $('#email').val();
    var password = $('#password').val();
    
    var gender = $('input:radio[name=gender]').val();
    console.log(gender);
    var address = $('#address').val();
        var remember =$('#remember').is(':checked');
/*    var remember = $('#remember').val();*/
    var id = $('#row_id').data('id');
    console.log(id);
    db.transaction(function(tx) {
        tx.executeSql(updateStatement, [email, password, gender, address, remember, id], loadAndReset, handleErrors);
        console.debug('executeSql: ' + updateStatement);
    });
}

function dropTable() {
    console.debug('called dropTable()');
    db.transaction(function(tx) {
        tx.executeSql(dropStatement, [], showRecords, handleErrors);
    });

    resetForm();
    createTable();

}

function loadRecord(i) {
    console.debug('called loadRecord()');
    var item = dataset.item(i);
    $('#email').val(item.email);
    $('#password').val(item['password']);
    var gender = $('input:radio[name=gender]').val();
   /*
    $('#op1').val(item['gender']);
       $('#op2').val(item['gender']);*/
   
    $('#address').val(item['address']);
    $('#remember').val(item['remember']);
    $('#row_id').data('id',item['id']);
}

function resetForm() {
    $('#email').val('');
    $('#password').val('');
    $('input:radio[name=gender]').val('');
     $('#address').val('');
    $('#remember').val('');
    $('#id').val('');
}

function loadAndReset() {
    resetForm();
    showRecords();
}

function handleErrors(transaction, error) {
    console.debug('called handleErrors()');
    console.error('error ' + error.message);
    alert(error.message);
    return true;
}

function showRecords() {
    console.debug('called showRecords()');

    db.transaction(function(transaction) {
        transaction.executeSql(selectAllStatement, [], renderRecords, handleErrors);
    });
}

function renderRecords(transaction, results) {
    console.debug('called renderRecords()');
    html = '';
    $('#results').html('');

    dataset = results.rows;
    var html;
    if (dataset.length > 0) {
        html = html + '<br/><br/>';

        html = html + '<table class="table table-bordered">';
        html = html + '  <caption>Records added</caption>';
        html = html + '  <thead>';
        html = html + '    <tr>';
        html = html + '      <th class="span1">Id</td>';
        html = html + '      <th>email</td>';
        html = html + '      <th>Password</td>';
        html = html + '      <th>gender</td>';
        html = html + '      <th>address</td>';
        html = html + '      <th>remember me</td>';
        html = html + '      <th class="span1">Actions</td>';
        html = html + '    </tr>';
        html = html + '  </thead>';

        html = html + '  <tbody>';

        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);

            html = html + '    <tr>';
            html = html + '      <td>' + item['id'] + '</td>';
            html = html + '      <td>' + item['email'] + '</td>';
            html = html + '      <td>' + item['password'] + '</td>';
            html = html + '      <td>' + item['gender'] + '</td>';
 
            html = html + '      <td>' + item['address'] + '</td>';
            html = html + '      <td>' + item['remember'] + '</td>';
            html = html + '      <td>';
            html = html + '        <button type="button" class="btn btn-primary btn-mini" onClick="loadRecord(' + i + ');">edit</button>';
            html = html + '        <button type"button" class="btn btn-danger btn-mini" onClick="deleteRecord(' + item['id'] + ');">delete</button>';
            html = html + '      </td>';
            html = html + '    </tr>';
        }

        html = html + '  </tbody>';
        html = html + '</table>';
        
        $('#results').append(html);
    }
}

/*
 dataset = results.rows;

 for (var i = 0, item = null; i < dataset.length; i++)
 {

 item = dataset.item(i);
 var linkeditdelete = '<li>' + item['email'] + ' , ' + item['password'] + ' , ' +item['op1]+ ' , '  +item['op2'] +  ',' +item['address']+  ', ' +item['remember'] ' ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' + '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';

 $("#res").append(linkeditdelete);
 }
 }
 */

$(document).ready(function() {
    createTable();
    /*
     $("#submitBut").click(insertRecord);

     $("#btnUp").click(updateRecord);

     $("#btnRe").click(resetForm);

     $("#btnDr").click(dropTable);*/

});

