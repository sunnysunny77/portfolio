<!DOCTYPE html>
<html>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
	$name      = $_REQUEST["name"];
	$phone     = $_REQUEST["phone"];
	$email     = $_REQUEST["email"];
	$message   = $_REQUEST["message"];
	$to_email  = "shlooby07@gmail.com";
	$subject   = "New Contact Us Message";

	$contactus = "\r\n" . "	You have a message from the contact us page on your website:" . "\r\n" . "	Name: " . $name . "\r\n" . "	Phone: " . $phone . "\r\n" . "	Email: " . $email . "\r\n" . "	Message: " . $message;

	$contactus = wordwrap($contactus, 70);
	$contactus_html = nl2br($contactus);

	mail($to_email, $subject, $contactus);
}
?>
	<pre> Thanks, sent to &#128231; </pre>
</body>
</html>
