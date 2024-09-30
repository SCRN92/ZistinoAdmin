/*
Template Name: زیستینو
Author: Themesdesign
Website: https://themesdesign.in/
Contact: themesdesign.in@gmail.com
File: Session Timeout Js File
*/

$.sessionTimeout({
	keepAliveUrl: 'pages-starter.html',
	logoutButton:'Logout',
	logoutUrl: 'auth-login.html',
	redirUrl: 'auth-lock-screen.html',
	warnAfter: 3000,
	redirAfter: 30000,
	countdownMessage: 'Redirecting in {timer} seconds.'
});

$('#session-timeout-dialog  [data-dismiss=modal]').attr("data-bs-dismiss", "modal");