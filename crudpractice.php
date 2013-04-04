<!DOCTYPE  HTML>
<html>
	<head>
		<title>test</title>

		<body>
			<ul id="results"></ul>
			<div id="logs"></div>
			Record:
			<input type="text" id="items" /></br>
			<input type="hidden" id="id"/>
			First name:<input type="text" id="firstName"/><br/>
			Last name:<input type="text" id="lastName"/><br/>
			Phone: <input type="text" id="phone"/><br/>
			<br />
			<br />
			<button onClick="createRecord()">
				Create Record
			</button>
			<button onClick="createTable()">
				Create Table
			</button>
			<button onClick="dropTable()">
				Drop Table
			</button>
			<br />
			<br />
		</body>
		<script>
			// Arguments: Database Name, Version, Display Name, Estimated Size (bytes)
			var database = openDatabase("TEST_DATABASE", "1.0", "HTML5 Web SQL Database", 300000);
			var log = document.querySelector("#logs");
			function readRecord() {
				document.querySelector("#results").innerHTML = '';
				database.transaction(function(tx) {
					tx.executeSql("SELECT * FROM TEST_TABLE", [], function(tx, result) {
						for (var i = 0, item = null; i < result.rows.length; i++) {
							item = result.rows.item(i);
							document.querySelector("#results").innerHTML += '<li><span contenteditable="true" onkeyup="updateRecord(' + item['id'] + ', this)">' + item['text'] + '</span> <a href="#" onclick="deleteRecord(' + item['id'] + ')">[Delete]</a></li>';
						}
					});
				});
			}

			// Update record on the fly
			function updateRecord(id, textEl) {
				database.transaction(function(tx) {
					tx.executeSql("UPDATE TEST_TABLE SET text = ? WHERE id = ?", [textEl.innerHTML, id], null, onError);
				});
			}

			// Delete selected record
			function deleteRecord(id) {
				database.transaction(function(tx) {
					tx.executeSql("DELETE FROM TEST_TABLE WHERE id=?", [id], function(tx, result) {
						readRecord()
					}, onError);
				});
			}

			// Add record with random values
			function createRecord() {
				var num = Math.round(Math.random() * 10000);
				// Random data
				database.transaction(function(tx) {
					tx.executeSql("INSERT INTO TEST_TABLE (id, text) VALUES (?, ?)", [num, document.querySelector('#items','#firstName').value], function(tx, result) {
						log.innerHTML = '';
						readRecord();
					}, onError);
				});
			}

			// Create table
			function createTable() {
				database.transaction(function(tx) {
					tx.executeSql("CREATE TABLE TEST_TABLE (id REAL UNIQUE, text TEXT)", [], function(tx) {
						log.innerHTML = '<p>TEST_TABLE created!</p>';
					}, onError);
				});
			}

			// Delete table from database
			function dropTable() {
				database.transaction(function(tx) {
					tx.executeSql("DROP TABLE TEST_TABLE", [], function(tx) {
						readRecord();
						log.innerHTML = '<p>TEST_TABLE dropped!</p>';
					}, onError);
				});
			}

			// Log errors
			function onError(tx, error) {
				log.innerHTML += '<p>' + error.message + '</p>';
			}
		</script>
	</head>
</html>