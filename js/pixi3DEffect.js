let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true
})

document.getElementById('home').appendChild(app.view)



let img = new PIXI.Sprite.from('images/logoPNG3D.png')
img.width = window.innerWidth
img.height = window.innerHeight
app.stage.addChild(img)

depthMap = new PIXI.Sprite.from("images/depthImagePNG.png")
app.stage.addChild(depthMap)

displacementFilter = new PIXI.filters.DisplacementFilter(depthMap)
app.stage.filters = [displacementFilter]

window.onmousemove = function (e) {
    displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) / 15 
    displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) / 15
}

window.addEventListener('resize', () => {
    console.log('abu')
    app.width = window.innerWidth
    app.height = window.innerHeight

    img.width = window.innerWidth
    img.height = window.innerHeight
})