import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import bezier from '@turf/bezier-spline';

import './mapboxgl.scss';
import './index.scss';
import port from 'assets/images/port.svg';
import portActive from 'assets/images/port-active.svg';
import ship from 'assets/images/ship.svg';

export const MapBox = ({ 
    id,
    markers = [],
    status = [],
    infos = [],
    routes = [],
    isPadding = true
}) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const [currentMarkers, setCurrentMarkers] = useState([]);

    let timeout = null;

    /*eslint-disable */
    useEffect(() => {
        const scripts = document.scripts;
        const MAPBOX_JS_URL = 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js';
        const TURF_JS_URL = 'https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v2.0.0/turf.min.js';
        let isInjected = false;

        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src === MAPBOX_JS_URL) {
                isInjected = true;
                break;
            }
        }

        if (!isInjected) {
            let mapScriptElement = document.createElement('script');
            mapScriptElement.src = MAPBOX_JS_URL;

            let turfScriptElement = document.createElement('script');
            turfScriptElement.src = TURF_JS_URL;

            document.head.appendChild(mapScriptElement);
            document.head.appendChild(turfScriptElement);
        }

        // timeout = setTimeout(() => setScriptLoaded(true), 500);

        return () => {
            window.map = null;
            if (timeout) {
                setFirstLoad(false);
                clearTimeout(timeout);
            }
        }
    }, []);

    useEffect(() => {
        if (window.mapboxgl && window.turf) {
            setScriptLoaded(true)
        }
    }, [window.mapboxgl, window.turf])

    useEffect(() => {
        removeSourcesAndLayers();
        if (scriptLoaded && !window.map && !firstLoad) {
            setFirstLoad(true);
            mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
            initializeMap();
        }
        if (scriptLoaded && window.map && markers.length > 0) {
            initializeMap(() => {
                const bounds = new window.mapboxgl.LngLatBounds();
                const newMarkers = markers.map((marker, markerIndex) => {
                    let m = marker;
                    if (markerIndex === 0) {
                        if (markers.length > 2) {
                            if (markers[1][0] >= 0) {
                                m = m[0] < 0 ? [360 + m[0], m[1]] : m;
                            } else {
                                m = m[0] >= 0 ? [m[0] - 360, m[1]] : m;
                            }
                        }
                    } else if (markerIndex === markers.length - 1) {
                        if (markers[markers.length - 2][0] >= 0) {
                            m = m[0] < 0 ? [360 + m[0], m[1]] : m;
                        } else {
                            m = m[0] >= 0 ? [m[0] - 360, m[1]] : m;
                        }
                    }

                    return m
                });
                const geoJson = {
                    type: 'FeatureCollection',
                    features: newMarkers.map((marker, markerIndex) => {
                        const activeIndex = status[markerIndex];
                        let m = marker;

                        return {
                            type: 'Feature',
                            properties: markerIndex === 0 || markerIndex === markers.length - 1 ? {
                                description: `<div class="customMarker">${infos[markerIndex]}</div>`,
                                icon: activeIndex ? portActive : port,
                                iconSize: [40, 40]
                            } : null,
                            geometry: {
                                type: 'Point',
                                coordinates: m
                            }
                        }
                    })
                };
                
                newMarkers.forEach(marker => bounds.extend(marker));

                const route = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: newMarkers
                            }
                        }
                    ]
                };
                // route.features[0] = bezier(route.features[0], {
                //     resolution: 5000
                // });

                let activeRoute = null;
                if (routes && routes.length > 0) {
                    activeRoute = {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'LineString',
                                    coordinates: routes
                                }
                            }
                        ]
                    };
                }

                if (routes && routes.length > 0 && routes.length < newMarkers.length) geoJson.features.push({
                    type: 'Feature',
                    properties: {
                        // description: `<div class="customMarker">${infos[infos.length - 1]}</div>`,
                        ship: true,
                        icon: ship,
                        iconSize: [60, 60]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: routes[routes.length - 1]
                    }
                })

                geoJson.features.forEach(marker => {
                    if (marker.properties) {
                        const popup = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            offset: 25
                        });
        
                        let el = document.createElement('div');
                        el.className = 'marker';
                        el.style.backgroundImage = `url(${marker.properties.icon})`;
                        el.style.backgroundSize = 'contain';
                        el.style.width = `${marker.properties.iconSize[0]}px`;
                        el.style.height = `${marker.properties.iconSize[1]}px`;
        
                        // if (!marker.properties.ship) {
                            el.style.cursor = 'pointer';
                            el.addEventListener('mouseenter', () => {
                                let coordinates = marker.geometry.coordinates.slice();
                                let description = marker.properties.description;
                                
                                if (description) popup.setLngLat(coordinates).setHTML(description).addTo(map);
                            })
        
                            el.addEventListener('mouseleave', () => {
                                popup.remove();
                            })
                        // }
        
                        const m = new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
                        setCurrentMarkers(oldMarkers => [...oldMarkers, m]);
                    }
                })

                // let lineDistance = turf.lineDistance(route.features[0], 'kilometers');
                // let lineActiveDistance = turf.lineDistance(activeRoute.features[0], 'kilometers');
                // let arc = [];
                // let activeArc = [];
                // let steps = 1000;

                // for (var i = 0; i < lineDistance; i += lineDistance / steps) {
                //     let segment = turf.along(route.features[0], i, 'kilometers');
                //     arc.push(segment.geometry.coordinates);
                // }
                // arc.push(newMarkers[newMarkers.length - 1]);

                // for (var i = 0; i < lineActiveDistance; i += lineActiveDistance / steps) {
                //     let segment = turf.along(activeRoute.features[0], i, 'kilometers');
                //     activeArc.push(segment.geometry.coordinates);
                // }
                // activeArc.push(routes[routes.length - 1]);

                // route.features[0].geometry.coordinates = arc;
                // activeRoute.features[0].geometry.coordinates = activeArc;
                window.map.addSource('route', {
                    type: 'geojson',
                    data: route
                });
                        
                if (activeRoute) window.map.addSource('activeRoute', {
                    type: 'geojson',
                    data: activeRoute
                });
                    
                window.map.addLayer({
                    id: 'route',
                    source: 'route',
                    type: 'line',
                    paint: {
                        'line-width': 2,
                        "line-dasharray": [0, 4, 3],
                        'line-color': '#DC2763'
                    }
                });
                    
                if (activeRoute) window.map.addLayer({
                    id: 'activeRoute',
                    source: 'activeRoute',
                    type: 'line',
                    paint: {
                        'line-width': 4,
                        'line-color': '#DC2763'
                    }
                });

                window.map.scrollZoom.enable();
                window.map.fitBounds(bounds, {
                    linear: false,
                    duration: 100,
                    padding: {
                        left: isPadding ? 600 : 100,
                        top: 100,
                        bottom: 100,
                        right: 100
                    }
                });
            });
        }
    }, [scriptLoaded, markers, routes]);
    /*eslint-enable */

    const initializeMap = (callback = () => {}) => {
        if (!window.map) {
            window.map = new window.mapboxgl.Map({
                container: id,
                style: 'mapbox://styles/mapbox/light-v10',
                zoom: 8,
                center: [103.360898, 1.583758],
                minZoom: 2,
                maxZoom: 15
            });
    
            window.map.scrollZoom.disable();
            window.map.doubleClickZoom.disable();
        }
        removeSourcesAndLayers();

        setTimeout(() => {
            callback();
        }, 500);
    }

    const removeSourcesAndLayers = () => {
        if (window.map) {
            const isRouteLayerExist = window.map.getLayer('route');
            const isActiveLayerExist = window.map.getLayer('activeRoute');
            const isRouteSourceExist = window.map.getSource('route');
            const isActiveRouteSourceExist = window.map.getSource('activeRoute');

            if (isRouteLayerExist) window.map.removeLayer('route');
            if (isActiveLayerExist) window.map.removeLayer('activeRoute');
            if (isRouteSourceExist) window.map.removeSource('route');
            if (isActiveRouteSourceExist) window.map.removeSource('activeRoute');

            if (currentMarkers.length > 0) currentMarkers.forEach(marker => marker.remove());
        }
    }

    return (
        <div className="tr__map mapbox box">
            <div id={id}></div>
        </div>
    )
};

MapBox.propTypes = {
    id: PropTypes.string,
    markers: PropTypes.array,
    status: PropTypes.array,
    infos: PropTypes.array,
    isPadding: PropTypes.bool,
    routes: PropTypes.array
};