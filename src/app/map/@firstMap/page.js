"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import React, { useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Search from '@arcgis/core/widgets/Search';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

export default function firstMap() {
    const [serviceUrl, setServiceUrl] = useState('');
    const [alertArcServiceMessage, setAlertArcServerMessage] = useState('');

    function clearInputs() {
        setServiceUrl('');
    }

    useEffect(() => {

        let map = new Map({
            basemap: 'streets-navigation-vector',
            layers: [new GraphicsLayer()]
        });

        // Create a view
        const view = new MapView({
            container: 'viewDiv',
            map: map,
            center: [30.062, 31.249],
            zoom: 6
        });

        const widgets = [
            {
                widget: new Search({ view: view }),
                position: 'top-right'
            },
            {
                widget: new Legend({ view: view }),
                position: 'bottom-left'
            },
            {
                widget: new BasemapGallery({ view: view }),
                position: 'top-right'
            },
            {
                widget: new ScaleBar({ view: view, unit: 'dual' }),
                position: 'bottom-left'
            }
        ];

        // Add each widget to the view's UI
        widgets.forEach(({ widget, position }) => {
            view.ui.add(new Expand({ view, content: widget, expanded: false }), position);
        });

        async function loadClick() {
            if (serviceUrl) {
                try {
                    const success = await loadArcGISService(serviceUrl, map);
                    if (success) {
                        setAlertArcServerMessage('تم تحميل البيانات بنجاح.');
                    } else {
                        setAlertArcServerMessage('لا توجد بيانات في هذا الرابط.');
                    }
                } catch (error) {
                    setAlertArcServerMessage('حدث خطأ أثناء تحميل البيانات ،الرجاء إدخال رابط صالح.');
                }
            } else {
                setAlertArcServerMessage('Please enter a valid ArcGIS service URL.');
            }
        }
        // Function to load an ArcGIS service
        async function loadArcGISService(serviceUrl, map) {

            try {
                const response = await fetch(serviceUrl);
                if (!response.ok) {
                    throw new Error('Request failed');
                }

                const mapImageLayer = new MapImageLayer({
                    url: serviceUrl,
                });

                // Remove the previous layer if it exists
                const existingLayer = map.findLayerById('loadedArcGISService');
                if (existingLayer) {
                    map.remove(existingLayer);
                }

                // Add the new layer to the map
                mapImageLayer.id = 'loadedArcGISService';
                map.add(mapImageLayer);

                if (map.findLayerById('loadedArcGISService')) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }

        }
        const loadServerDataButton = document.getElementById('loadServerDataButton');
        if (loadServerDataButton) {
            loadServerDataButton.addEventListener('click', loadClick);
        }

    }, [serviceUrl]);

    return (
        <>
            <div >
                <div className='title-1'>
                    <p style={{ fontSize: '17px', margin: '5px auto', borderBottom: '1px solid #white', width: 'fit-content' }}>ArcGIS Server Service</p>
                </div>
                {/* map */}
                <div className="viewDiv" id="viewDiv" ></div>
                {/* map */}

                <div className='clos-data' style={{ marginTop: "15px", textAlign: 'center' }}>
                    <div className='arcserver'>
                        {/* Input For ArcServer Service REST URL */}
                        <input
                            style={{ color: 'white' }}
                            className='arcserver-inpu'
                            type="text"
                            placeholder="Enter ArcGIS Service REST URL"
                            value={serviceUrl}
                            onChange={(e) => setServiceUrl(e.target.value)}
                        />
                        <button className='btn btn-primary btn-sm' id="loadServerDataButton">Load Data</button>
                    </div>
                    {/* Inputs Clear Button */}
                    <div className='clear'>
                        <button className='btn btn-success btn-sm' id="clr-btn" onClick={clearInputs}>Clear input</button>
                    </div>
                </div>
            </div>

        </>
    );
}