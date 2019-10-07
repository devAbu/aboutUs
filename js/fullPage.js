new fullpage('#fullPage', {
    autoScrolling: true,
    navigation: true,
    anchors: ['homeSection', 'skillsSection', 'teamsSection',
        'projectsSection' /* , 'contactSection' */
    ],
    navigationTooltips: ['Home', 'Skills', 'Team', 'Projects' /* , 'Contact' */ ],
    showActiveTooltip: true,
    scrollingSpeed: 850,
    /* continuousVertical: true, */
    normalScrollElements: '.normalScroll',
    scrollBar: true,
    bigSectionsDestination: top,
    css3: true
})
/* 
var w = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

if (w <= 767) {
    $('.s3').addClass('normalScroll')
    $('.s4').addClass('normalScroll')
} else {
    $('.s3').removeClass('normalScroll')
    $('.s4').removeClass('normalScroll')
} */

$('#fp-nav ul li a').prepend("<label></label>")
$('#fp-nav ul li a span').remove()