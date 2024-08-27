"use client"

import "./style.css";
import { useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Map from '@arcgis/core/Map';
import Search from '@arcgis/core/widgets/Search';
import Sketch from '@arcgis/core/widgets/Sketch';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Fullscreen from '@arcgis/core/widgets/Fullscreen';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import LayerList from '@arcgis/core/widgets/LayerList';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';

export default function FirstMap() {
    const [webmapId, setWebmapId] = useState("71ba2a96c368452bb73d54eadbd59faa");
    const [view, setView] = useState(null);

    useEffect(() => {
        const webmap = new WebMap({
            portalItem: {
                id: webmapId
            }
        });

        // Create a view
        const view = new MapView({
            container: 'mapView',
            map: webmap,
        });

        const widgets = [
            {
                widget: new Search({ view: view }),
                position: 'top-right'
            },
            {
                widget: new Sketch({ view: view, layer: new GraphicsLayer() }),
                position: 'top-right'
            },
            {
                widget: new Legend({ view: view }),
                position: 'bottom-left'
            },
            {
                widget: new Fullscreen({ view: view }),
                position: 'top-right'
            },
            {
                widget: new BasemapGallery({ view: view }),
                position: 'top-right'
            },
            {
                widget: new LayerList({ view: view }),
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

        setView(view);
    }, [webmapId]); // يحدث التأثير عندما يتغير webmapId

    const handleWebmapIdChange = (event) => {
        setWebmapId(event.target.value);
    };

    return (
        <>
            <div>
                <div className='title-2'>
                    <p style={{ fontSize: '17px', margin:'5px auto', borderBottom: '1px solid #white', width: 'fit-content' }}>ArcGIS Online Data</p>
                </div>
                {/* map */}
                <div className='mapView' id="mapView" ></div>
                {/* map */}

                {/* Input */}
                <div style={{ textAlign: 'center' }}>
                    <input
                        style={{ width: "500px", padding: "10px", marginTop: '15px' }}
                        type="text"
                        value={webmapId}
                        onChange={handleWebmapIdChange}
                        placeholder="Enter ArcGIS Online Webmap ID"
                    />
                </div>

            </div>
        </>
    )
}
