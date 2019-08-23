function init(){
    const
        fiskLayerMinX = parseFloat(document.body.dataset.fiskMinX),
        fiskLayerMinY = parseFloat(document.body.dataset.fiskMinY),
        fiskLayerMaxX = parseFloat(document.body.dataset.fiskMaxX),
        fiskLayerMaxY = parseFloat(document.body.dataset.fiskMaxY),
        fiskLayerExtent = [fiskLayerMinX, fiskLayerMinY, fiskLayerMaxX, fiskLayerMaxY],
        fiskLayerCenter = [(fiskLayerExtent[0] + fiskLayerExtent[2])/2, (fiskLayerExtent[1] + fiskLayerExtent[3])/2],
        fiskLayerMinZoom = 6,
        fiskLayerMaxZoom = 12;

    const osmLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });

    const fiskMapLayer = new ol.layer.Tile({
        extent: ol.proj.transformExtent(fiskLayerExtent, 'EPSG:4326', 'EPSG:3857'),
        source: new ol.source.XYZ({
            attributions: 'Fisk map tiles generated by GDAL2Tiles',
            url: './{z}/{x}/{-y}.png',
            minZoom: fiskLayerMinZoom,
            maxZoom: fiskLayerMaxZoom
        })
    });

    const view = new ol.View({
        center: ol.proj.fromLonLat(fiskLayerCenter),
        zoom: 9,
        projection: "EPSG:3857",
        displayProjection: new ol.proj.Projection("EPSG:4326")
    });

    const map = new ol.Map({
        view: view,
        layers: [
            osmLayer,
            fiskMapLayer
        ],
        target: 'map',
        numZoomLevels: 20
    });
}