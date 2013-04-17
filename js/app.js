var dataset;
var DataType;
var createStatement = 'CREATE TABLE IF NOT EXISTS ankita(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, empid TEXT, email TEXT, age TEXT, gender TEXT , salary TEXT, joiningdate TEXT,image BLOB)';
var insertStatement = 'INSERT INTO ankita(name, empid,email,age,gender,salary,joiningdate,image) VALUES (?,?,?,?,?,?,?,?)';
var updateStatement = 'UPDATE ankita SET name = ?, empid= ?,email= ?,age = ?, gender = ?,  salary =?,joiningdate=?,image=?  WHERE id=?';
var deleteStatement = 'DELETE FROM ankita WHERE id=?';
var dropStatement = 'DROP TABLE ankita';
var sort='SELECT * FROM ankita ORDER BY name ASC ';
var sortdes='SELECT * FROM ankita ORDER BY name DESC ';
var selectAllStatement = 'SELECT * FROM ankita';
var db;
var shortName = 'MyDatabase';
var version = '1.0';
var displayName = 'My Test Database Example';
var maxSizeInBytes = 65536;
db = openDatabase(shortName, version, displayName, maxSizeInBytes);
var inverse = false;
/*
$(document).ready(function() 
    { 
        $("#tblSearch").tablesorter(); 
    } 
); 

$(document).ready(function() 
    { 
        $("#tblSearch").tablesorter( {sortList: [[0,0], [1,0]]} ); 
    } 
); 
*/

function createTable() {
       db.transaction(function(tx) {
        tx.executeSql(createStatement, [], showRecords, handleErrors);

    });
}

function insertRecord() {
    var name = $('#name').val();
     var empid = $('#empid').val();
 var email = $('#email').val();
     var age = $('#age').val();
    var gender = $('input:radio[name=gender]:checked').val();
console.log("gender")   
 var salary = $('#salary').val();
      var joiningdate = $('#joiningdate').val();
      var image =$('.images').attr("src");
    
      console.log("image")
    db.transaction(function(tx) {
        tx.executeSql(insertStatement, [name, empid,email,age,gender,salary,joiningdate,image], loadAndReset, handleErrors);
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
    var empid = $('#empid').val();
    var email = $('#email').val();
    var age = $('#age').val();
    var gender = $('input:radio[name=gender]:checked').val();
     console.log(gender);
      var salary = $('#salary').val();
      var joiningdate = $('#joiningdate').val();
    var id = $('#row_id').data('id');
    
    db.transaction(function(tx) {
        tx.executeSql(updateStatement, [name, empid,email,age,gender,salary,joiningdate,id], loadAndReset, handleErrors);
        
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
     $('#empid').val(item['empid']);
     $('#email').val(item.email);
    $('#age').val(item['age']);
        var gender = $('input:radio[name=gender]').val();
    $('#salary').val(item['salary']);
     $('.images').attr("src");
    $('#joiningdate').val(item['joiningdate']);
        $('#row_id').data('id',item['id']);
}

function resetForm() {
    $('#name').val('');
    $('#empid').val('');
    $('#email').val('');
    $('#age').val('');
        $('#id').val('');
        $('input:radio[name=gender]').val('');
        $('#salary').val('');
        $('#joiningdate').val('');
       //$('#photo').item['image'];

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

function sortTable()
{
	db.transaction(function(transaction){
   transaction.executeSql(sort,[], renderRecords, handleErrors);
});

}
function sortTabledesc()
{
	db.transaction(function(transaction){
   transaction.executeSql(sortdes,[], renderRecords, handleErrors);
});
}

function renderRecords(transaction, results) {
    html = '';
    $('#results').html('');

    dataset = results.rows;
    var html;
    if (dataset.length > 0) {
        html+= '<br/><br/>';

        html+= '<table class="table table-bordered" id="tblSearch">';
        html+= '  <caption>Row inserted</caption>';
        html+='  <thead>';
        html+='    <tr>';
        html+= '      <th  class="span1" >Id</th>';
        html+= '      <th class="sort-alpha">name</th>';
         html+= '      <th class="sort-alpha">empid</th>';
          html+= '      <th class="sort-alpha">email</th>';
        html+='      <th class="sort-alpha">age</th>';
       html+= '      <th  class="sort-alpha" >Gender</th>';
        html+= '      <th class="sort-alpha">salary</th>';
         html+= '      <th class="sort-alpha">Date of Joining</th>';
          html+= '      <th class="sort-alpha">Image</th>';

        html+= '      <th class="sort-alpha">Actions</td>';
        html +='    </tr>';
        html += '  </thead>';

        html+= '  <tbody>';

        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);
            html +='    <tr>';
            html += '      <td>' + item['id'] + '</td>';
            
            html += '      <td>' + item['name'] + '</td>';
             html += '      <td>' + item['empid'] + '</td>';
              html += '      <td>' + item['email'] + '</td>';
            html += '      <td>' + item['age'] + '</td>';
            html += '      <td>' + item['gender'] + '</td>';
             html += '      <td>' + item['salary'] + '</td>';
              html += '      <td>' + item['joiningdate'] + '</td>';
               html += '      <td>' + item['image'] + '</td>';
            html += '      <td>';
            html += '        <a href="#" onclick="loadRecord(' + i + ')">edit</a></li><br/>';
            html += '        <a href="#" onclick="deleteRecord('+item['id']+')">delete</a></li>';                                      

            html +='      </td>';
            html +='    </tr>';
        }

        html += '  </tbody>';
        html += '</table>';
        
        $('#results').append(html);
    }
}

function searchTable()
{
	$('#search').keyup(function(){
     inputVal = $(this).val();
	var table = $('#tblSearch');
	table.find('tr').each(function(index, row)
	{
		var allCells = $(row).find('td');
		if(allCells.length > 0)
		{
			var found = false;
			allCells.each(function(index, td)
			{
				var regExp = new RegExp(inputVal, 'i');
				if(regExp.test($(td).text()))
				{
					found = true;
					return false;
				}
			});
			if(found == true)$(row).show();else $(row).hide();
		}
	});

});
}


$(document).ready(function() {
    createTable();
    searchTable();
    sortTable	();
    sortTabledesc();
$('#count_table_rows').click(function() {
 
var rows = $("#tblSearch tr").length;
 
alert('Total Rows: '+rows);
});


	
	
	$(document).on('click', '#tblSearch thead th', function() {
				var table = $('table');
				
				
					var th = $(this), thIndex = th.index();
					table.find('td').filter(function() {
						console.log(thIndex);
		
						return $(this).index() === thIndex;
		
					}).sortElements(function(a, b) {
						var textA = $.text([a]).toLowerCase();
						var textB = $.text([b]).toLowerCase();
		
						return textA > textB ? inverse ? -1 : 1 : inverse ? 1 : -1;
		
					}, function() {
		
						// parentNode is the element we want to move
						return this.parentNode;
		
					});
		
					inverse = !inverse;
		
		
			}); 
	
		
	
	
	
// 
// $(document).on('click','#asc', function(e) {
    // e.preventDefault();
    // $('#tblSearch').listSorter();
// });
// $(document).on('click','#desc', function(e) {
    // e.preventDefault();
    // $('#tblSearch').listSorter({
        // order: 'desc'
    // });
});
 
 

 
 

   