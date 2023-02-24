import './Map.styles.scss';
import Image from '@assets/images/utils/Instagram.png';
import { observer } from 'mobx-react-lite';
import { MapContainer, TileLayer,ZoomControl  } from 'react-leaflet';
import CustomMarker from '@streetcode/MapBlock/Map/Marker/MarkerWrapper.component';
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl';
import React, { useState, useEffect } from 'react';
import useMobx from '@/app/stores/root-store';
import StreetcodeCoordinate from '@/models/additional-content/coordinate.model';
import Toponym from '@/models/toponyms/toponym.model';
import CustomMarkerCluster from './MarkerCluster/MarkerClusterWrapper.component';
import VectorTileLayer from 'react-leaflet-vector-tile-layer';  
import * as L from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
const defaultZoom = 6.4;

const centerOfUkraine = {
    latitude: 48.4501,
    longtitude: 31.3234,
};

interface Props {
    streetcodeCoordinates: StreetcodeCoordinate[],
    toponyms: Toponym[]
}

const MapOSM = ({ streetcodeCoordinates, toponyms }: Props) => {
    const { checkboxStore } = useMobx();
    const { checkBoxesState: { streetcodes, streets } } = checkboxStore;
     var mapOptions = {
        gestureHandling: true
      }

    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

    // return (
    //     <div className="mapCentered">
    //         <MapContainer {...mapOptions} center={[centerOfUkraine.latitude, centerOfUkraine.longtitude]}
    //          zoom={defaultZoom} className="mapContainer"
    //           scrollWheelZoom={true}>
    //             <TileLayer
    //                 url="https://tile.openstreetmap.org.ua/styles/positron-gl-style/{z}/{x}/{y}.png"
    //             />
    //             {streetcodes?.isActive && (
    //                 <CustomMarkerCluster>
    //                     {streetcodeCoordinates?.map((sc) => <CustomMarker latitude={sc.latitude} longtitude={sc.longtitude} title={String(sc.id)} description={String(sc.streetcodeId)} />)}
    //                 </CustomMarkerCluster>
    //             )}
    //             {streets?.isActive && (
    //                 <CustomMarkerCluster>
    //                     {toponyms?.map((t) => <CustomMarker latitude={t.coordinate?.latitude} longtitude={t.coordinate?.longtitude} title={String(t.id)} description={`${t.streetType} ${t.streetName}`} />)}
    //                 </CustomMarkerCluster>
    //             )}
    //         </MapContainer>
    //     </div>
    // );

    return (
        <div className="mapCentered">
           
            <MapContainer {...mapOptions} center={[centerOfUkraine.latitude, centerOfUkraine.longtitude]}
             zoom={defaultZoom} maxZoom={20} minZoom={1} zoomControl={false} className="mapContainer"
              scrollWheelZoom={true} style={{ height: '100vh', width: '100vw' }}>
                <VectorTileLayer                
                    styleUrl="https://api.maptiler.com/maps/8ea6d995-4375-4873-a720-86be88576488/style.json?key=gEzGMwfl1Uo3TJWS0xcQ"              
                />
                
                {streetcodes?.isActive && (
                    <CustomMarkerCluster>
                        {streetcodeCoordinates?.map((sc) => <CustomMarker latitude={sc.latitude} longtitude={sc.longtitude} title={String(sc.id)} description={String(sc.streetcodeId)} />)}
                    </CustomMarkerCluster>
                )}
                {streets?.isActive && (
                    <CustomMarkerCluster>
                        {toponyms?.map((t) => <CustomMarker latitude={t.coordinate?.latitude} longtitude={t.coordinate?.longtitude} title={String(t.id)} description={`${t.streetType} ${t.streetName}`} />)}
                    </CustomMarkerCluster>
                )}
                
                <ZoomControl position='bottomleft' /> 
            </MapContainer>
        </div>
    );
    
};

export default observer(MapOSM);
