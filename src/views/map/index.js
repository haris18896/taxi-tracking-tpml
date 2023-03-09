/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions'

// import turf from 'turf'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'

const Map = props => {
  const mapContainer = useRef(null)
  const directionsClient = mapboxDirections({ accessToken: mapboxgl.accessToken })

  const addToMap = (map, coordinates, popupContent) => {
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)

    const popup = new mapboxgl.Popup({
      closeButton: false,
      offset: [0, -10]

      // className: 'marker-tooltip'
    }).setHTML(popupContent)

    marker.getElement().addEventListener('mouseenter', () => {
      popup.setLngLat(coordinates).addTo(map)
    })

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove()
    })
  }

  const getRoute = async (start, end) => {
    const startPoint = [parseFloat(start[0]), parseFloat(start[1])]
    const endPoint = [parseFloat(end[0]), parseFloat(end[1])]

    const response = await directionsClient
      .getDirections({
        waypoints: [{ coordinates: startPoint }, { coordinates: endPoint }],
        profile: 'driving',
        geometries: 'geojson'
      })
      .send()

    if (response.body.code !== 'Ok') {
      throw new Error('No route found')
    }

    const route = response.body.routes[0].geometry

    return route
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: props.pickUpCoordinates,
      zoom: 9
    })
    map.on('load', () => {
      if (props.pickUpCoordinates) {
        addToMap(map, props.pickUpCoordinates, `<span>Pick-up point</span>`)
      }

      if (props.dropoffCoordinates) {
        addToMap(map, props.dropoffCoordinates, `<span>Drop-off point</span>`)
      }

      if (props.pickUpCoordinates && props.dropoffCoordinates) {
        map.fitBounds([props.pickUpCoordinates, props.dropoffCoordinates], {
          padding: 60
        })

        getRoute(props.pickUpCoordinates, props.dropoffCoordinates).then(route => {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: route
              }
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          })

          // const routeLength = turf.length(route, { units: 'kilometers' })
          // const routeDuration = response.body.routes[0].duration / 60 // in minutes
          // console.log('Route length:', routeLength, 'km')
          // console.log('Route duration:', routeDuration, 'min')
        })
      }
    })
  }, [props.pickUpCoordinates, props.dropoffCoordinates])

  return <div ref={mapContainer} className='map-container' />
}

export default Map
