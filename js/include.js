$(window).on("load", function () {
    $(document).ready(function () {
        console.log('juhu')
        $('#welcome').load('./views/welcome.html')
        //$('#typedjs').load('./views/typedjs.html')
        //$('#arrowDown').load('./views/arrowDown.html')
        $('#skills').load('./views/skills.html')
        $('#teams').load('./views/teams.html')
        $('#project').load('./views/project.html')
        $('#footer').load('./views/footer.html')
    })
})