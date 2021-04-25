import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { HomeContext } from 'contexts';

import './index.scss';
import { MAP_API_URL } from 'actions';
import { getPoint, GmapsCubicBezier, isValidPosition } from 'utils';

import portSVG from 'assets/images/port.svg';
import portActiveSVG from 'assets/images/port-active.svg';

export const Map = ({ id, pos1, pos2, pos3, pos4 }) => {
    const { setLoading } = useContext(HomeContext);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [lines, setLines] = useState([]);
    const [markers, setMarkers] = useState([]);

    let timeout = null;
    // eslint-disable-next-line no-unused-vars
    let map = null;
    let GoogleMap = null;
    let Map = null;
    let LatLng = null;
    let LatLngBounds = null;
    let Marker = null;

    /*eslint-disable */
    useEffect(() => {
        const scripts = document.scripts;
        let isInjected = false;

        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src === MAP_API_URL) {
                isInjected = true;
                break;
            }
        }

        if (!isInjected) {
            let googleMapScriptElement = document.createElement('script');
            googleMapScriptElement.src = MAP_API_URL;

            document.head.appendChild(googleMapScriptElement);
        }

        timeout = setTimeout(() => setScriptLoaded(true), 500);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    }, []);

    useEffect(() => {
        setLoading(!scriptLoaded);

        if (scriptLoaded && window.google) {
            GoogleMap = google.maps;
            Map = google.maps.Map;
            LatLng = google.maps.LatLng;
            LatLngBounds = google.maps.LatLngBounds;
            Marker = google.maps.Marker;

            let bounds = null;
            if (isValidPositions()) {
                bounds = new LatLngBounds();
                bounds.extend(convertToLatLng(pos1));
                bounds.extend(convertToLatLng(pos2));
                bounds.extend(convertToLatLng(pos3));
                bounds.extend(convertToLatLng(pos4));
            }
            
            map = new Map(document.getElementById(id), {
                center: bounds ? bounds.getCenter() : {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 12
            });

            if (bounds) map.fitBounds(bounds);

            google.maps.event.addListener(map, 'projection_changed', updateCurveMarker);
            google.maps.event.addListener(map, 'zoom_changed', updateCurveMarker);
        }
    }, [scriptLoaded]);
    /*eslint-enable */

    const isValidPositions = () => {
        return isValidPosition(pos1)
                && isValidPosition(pos2)
                && isValidPosition(pos3)
                && isValidPosition(pos4);
    }

    const convertToLatLng = position => {
        return new LatLng(...position);
    }

    const initMarker = (position, icon, text) => {
        const marker = new Marker({
            position: convertToLatLng(position),
            icon: {
                url: icon,
                size: new GoogleMap.Size(30, 30),
                anchor: new GoogleMap.Point(15, 15)
            },
            map: map
        });

        const infoWindow = new GoogleMap.InfoWindow({
            content: `<div class="customMarker">${text}</div>`
        });

        marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
        });
        marker.addListener("mouseout", () => {
            infoWindow.close();
        });
        
        return marker;
    }

    const updateCurveMarker = () => {
        if (scriptLoaded && window.google && GoogleMap && isValidPositions()) {
            var markerP1 = initMarker(pos1, portActiveSVG, "Singapore Port - SGSIN");
            var markerP2 = initMarker(pos2, portActiveSVG, "Kuala Lumpur Port - MYKUL");
            var markerP3 = initMarker(pos3, portSVG, "Visakhapatnam Port - IDVHK");
            var markerP4 = initMarker(pos4, portSVG, "Nelore Port - IDNLR");
            
            var pos = {
                markA: {
                    lat: markerP1.getPosition().lat(),
                    lng: markerP1.getPosition().lng()
                },
                markB: {
                    lat: markerP2.getPosition().lat(),
                    lng: markerP2.getPosition().lng()
                },
                markC: {
                    lat: markerP3.getPosition().lat(),
                    lng: markerP3.getPosition().lng()
                },
                markD: {
                    lat: markerP4.getPosition().lat(),
                    lng: markerP4.getPosition().lng()
                },
            };
    
            lines.forEach(line => {
                line.setMap(null);
            });
            markers.forEach(marker => {
                marker.setMap(null);
            });
    
            const points = getPoint(pos.markA, pos.markB, 2);
            const points2 = getPoint(pos.markB, pos.markC, 4);
            const points3 = getPoint(pos.markC, pos.markD, 2);
            const markerAPoint = points.top;
            const markerBPoint = points.bottom;
            const markerB1Point = points2.top;
            const markerCPoint = points2.bottom;
            const markerC1Point = points3.top;
            const markerDPoint = points3.bottom;
    
            var markerA = new Marker({
                position: new LatLng(markerAPoint.x, markerAPoint.y),
                map: map,
                icon: {
                    url: ""
                }
            });
            var markerB = new Marker({
                position:  new LatLng(markerBPoint.x, markerBPoint.y),
                icon: {
                    url: ""
                },
                map: map
            });
            var markerB1 = new Marker({
                position:  new LatLng(markerB1Point.x, markerB1Point.y),
                icon: {
                    url: ""
                },
                map: map
            });
            var markerC = new Marker({
                position: new LatLng(markerCPoint.x, markerCPoint.y),
                map: map,
                icon: {
                    url: ""
                }
            });
            var markerC1 = new Marker({
                position: new LatLng(markerC1Point.x, markerC1Point.y),
                map: map,
                icon: {
                    url: ""
                }
            });
            var markerD = new Marker({
                position:  new LatLng(markerDPoint.x, markerDPoint.y),
                icon: {
                    url: ""
                },
                map: map
            });
    
            markerA.addListener('mouseover');
    
            setMarkers([...markers, markerA, markerB, markerC, markerD]);
    
            const line1 = new GmapsCubicBezier(GoogleMap, markerP1.getPosition(), markerA.getPosition(), markerB.getPosition(), markerP2.getPosition(), 0.01, map, false, true);
            const line2 = new GmapsCubicBezier(GoogleMap, markerP2.getPosition(), markerB1.getPosition(), markerC.getPosition(), markerP3.getPosition(), 0.01, map, true, false);
            const line3 = new GmapsCubicBezier(GoogleMap, markerP2.getPosition(), markerB1.getPosition(), markerC.getPosition(), markerP3.getPosition(), 0.01, map, false, false);
            const line4 = new GmapsCubicBezier(GoogleMap, markerP3.getPosition(), markerC1.getPosition(), markerD.getPosition(), markerP4.getPosition(), 0.01, map, false, false);

            setLines([...lines, line1.Line, line2.Line, line3.Line, line4.Line]);
            setMarkers([...markers, ...line1.markers, ...line2.markers, ...line3.markers, ...line4.markers]);
        }
    }

    return (
        <div className="tr__map box">
            {scriptLoaded && (
                <div id={id} className="tr__map--box"></div>
            )}
        </div>
    )
};

Map.propTypes = {
    id: PropTypes.string,
    pos1: PropTypes.array,
    pos2: PropTypes.array,
    pos3: PropTypes.array,
    pos4: PropTypes.array
};