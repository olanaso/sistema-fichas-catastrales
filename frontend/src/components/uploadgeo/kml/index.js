var {toGeoJSON:tj}=window;

function toDom(x) {
    return (new DOMParser()).parseFromString(x, "text/xml");
}

export function getextfromfilekml(file) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        try {
            reader.onload = function () {
                if (reader.readyState != 2 || reader.error) {
                    return;
                } else {
                    let textkml = reader.result;
                    let dom = toDom(textkml);
                    let geojson = tj.kml(dom);
                    resolve(geojson);
                }
            };
            reader.readAsText(file);
        }
        catch (e) {
            reject(e);
        }
    })
}