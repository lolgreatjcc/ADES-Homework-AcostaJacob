// Add this js file to ant html file to include jQyuery, Bootstrap, Bootstrap.js and font-awesome icons.
// Requires head.js and jQuery
// Note: the href link uses a relative path.  

$('head').append('<link href="../../includeHTML/css/color_scheme.css" rel="stylesheet">');
$(document).ready(() => {
    $('body').prepend(`
    <nav class="navbar navbar-dark navbar-expand-lg" id="header">
    <div class=" container-fluid">
        <a class="navbar-brand" href="#">
            <img src="../../includeHTML/assets/index.jpg" alt="" width="30" height="30" class="d-inline-block align-text-top me-1">
            Jacob's Homeworks: Homework 2
        </a>
    </div>
</nav>
`)
})
