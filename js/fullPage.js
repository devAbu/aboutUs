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

$('#fp-nav ul li a').prepend("<label></label>")
$('#fp-nav ul li a span').remove()