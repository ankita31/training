<!DOCTYPE html>
<html>
<head>
<title>test</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- Bootstrap -->
<link href="./bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet" media="screen">
</head>
<body data-spy="scroll" data-target=".navbar">...</body>

  <div class="row-fluid span12">
	<div class="span3">
Level 1 column
<form action="demo_form.asp" autocomplete="on">
  First name:<input type="text" name="fname"><br>
  Last name: <input type="text" name="lname"><br>
  E-mail: <input type="email" name="email" autocomplete="off"><br>
  <input type="submit">
</form>
</div>
<div class="span3">
	<form action="demo_form.asp">
  E-mail: <input type="email" name="userid"><br>
  <input type="submit" value="Submit"><br>
  <input type="submit" formnovalidate value="Submit without validation">
</form>
</div>
<script src="../js/jquerry.js"></script>
<script src="./bootstrap/js/bootstrap.min.js"></script>
</body>
</html>

