import shipSVG from 'assets/images/ship.svg';

let GmapsCubicBezier = function(googleMap, latlong1, latlong2, latlong3, latlong4, resolution, map, isHalf, isActive) {
    let markers = [];
    let lat1 = latlong1.lat();
    let long1 = latlong1.lng();
    let lat2 = latlong2.lat();
    let long2 = latlong2.lng();
    let lat3 = latlong3.lat();
    let long3 = latlong3.lng();
    let lat4 = latlong4.lat();
    let long4 = latlong4.lng();

    let points = [];

    for (let it = 0; it <= 1; it += resolution) {
        points.push(this.getBezier({
            x: lat1,
            y: long1
        }, {
            x: lat2,
            y: long2
        }, {
            x: lat3,
            y: long3
        }, {
            x: lat4,
            y: long4
        }, it));
    }
    let path = [];
    for (let i = 0; i < points.length - 1; i++) {
        path.push(new googleMap.LatLng(points[i].x, points[i].y));
        path.push(new googleMap.LatLng(points[i + 1].x, points[i + 1].y, false));
    }
    let halfPoints = path.slice(0, Math.floor(path.length / 2));
    let endingHalfPoint = halfPoints[halfPoints.length - 1];

    if (isHalf) {
        let markerHalfPoint = new googleMap.Marker({
            position: endingHalfPoint,
            icon: {
                url: shipSVG,
                size: new googleMap.Size(50, 50),
                anchor: new googleMap.Point(25, 25)
            },
            map: map
        });

        markers.push(markerHalfPoint);
    }

    let Line = new googleMap.Polyline({
        path: isHalf && !isActive ? path.slice(Math.floor(path.length / 2), path.length) : path,
        geodesic: true,
        strokeOpacity: 0.0,
        icons: [{
            icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: isHalf || isActive ? 3 : 2
            },
            offset: '-30px',
            repeat: isHalf || isActive ? '5px' : '10px'
        }],
        strokeColor: '#DC2763'
    });
    Line.setMap(map);

    return {
        Line,
        markers
    };
};

GmapsCubicBezier.prototype = {
    B1: function (t) {
        return t * t * t;
    },
    B2: function (t) {
        return 3 * t * t * (1 - t);
    },
    B3: function (t) {
        return 3 * t * (1 - t) * (1 - t);
    },
    B4: function (t) {
        return (1 - t) * (1 - t) * (1 - t);
    },
    getBezier: function (C1, C2, C3, C4, percent) {
        var pos = {};
        pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
        pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
        return pos;
    }
};

const getPoint = (markA, markB, ratio) => {
    const biggerAX = markA.lat > markB.lat;
    const biggerAY = markA.lng > markB.lng;

    var topX = biggerAX ? markA.lat - (markA.lat - markB.lat)/ratio : markB.lat - (markB.lat - markA.lat)/ratio;
    var topY = biggerAY ? markA.lng - (markA.lng - markB.lng)/ratio: markB.lng - (markB.lng - markA.lng)/ratio;
    var bottomX = biggerAX ? markB.lat + (markA.lat - markB.lat)/ratio : markA.lat + (markB.lat - markA.lat)/ratio;
    var bottomY = biggerAY ? markB.lng + (markA.lng - markB.lng)/ratio: markA.lng + (markB.lng - markA.lng)/ratio;

    if (biggerAY && biggerAX) {
        topY = markB.lng - (markB.lng - markA.lng)/ratio;
        bottomY = markA.lng + (markB.lng - markA.lng)/ratio;
    }

    if (!biggerAY && !biggerAX) {
        topY = markA.lng - (markA.lng - markB.lng)/ratio;
        bottomY = markB.lng + (markA.lng - markB.lng)/ratio;
    }

    return {
        top: {
            x: topX,
            y: topY
        },
        bottom: {
            x: bottomX,
            y: bottomY
        }
    }
}

export {
    GmapsCubicBezier,
    getPoint
};