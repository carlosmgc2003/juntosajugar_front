import {GoogleApiWrapper, Map} from 'google-maps-react';
import React, {Component} from "react";

const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
    render() {
        return (
            <div style={{position: 'relative', width: '100vw', height: '40vh'}}>
                <Map
                    google={this.props.google}
                    zoom={20}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: -34.574735,
                            lng: -58.435515
                        }
                    }
                />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAGYBRU28A_GrSZDmT1ieXJW8ZXJXJLiZQ'
})(MapContainer);
