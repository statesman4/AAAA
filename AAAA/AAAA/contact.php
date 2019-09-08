<?php

// Edit these 2 lines
$email  = 'test@yahoo.com';
$return = 'http://www.google.com';

// Do not edit anything below this line
if(!$_POST) header("Location: /");
mail($email, "Contact form filled in", "Name: " . $_POST['name'] . "\nEmail: " . $_POST['email'] . "\n\n" . $_POST['comments']);
header("Location: $return");

?>