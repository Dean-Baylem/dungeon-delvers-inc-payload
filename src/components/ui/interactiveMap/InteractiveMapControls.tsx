'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function InteractiveMapControls() {
  const map = useMap();

  useEffect(() => {
    const controlGroup = L.Control.extend({
      onAdd: function () {
        const mainMenu = L.DomUtil.create('div', 'leaflet-bar mapControls');

        const menuOptions = [
          {
            legend: 'Display Options',
            groupClass: 'mapControls--displayOptions',
            mainOptions: [
              {
                label: 'Show Regions',
                id: 'show-regions',
                title: 'Toggle Regions Display',
                onClick: (e: Event) => {
                  console.log('Toggle Regions Display');
                },
              },
              {
                label: 'Show Pins',
                id: 'show-pins',
                title: 'Toggle Pins Display',
                onClick: (e: Event) => {
                  console.log('Toggle Pins Display');
                },
              },
            ],
          },
        ];

        menuOptions.forEach(({ legend, groupClass, mainOptions }) => {
          const box = L.DomUtil.create('div', `mapControls--box ${groupClass}`, mainMenu);
          const labelEl = L.DomUtil.create('p', 'mapControls--label', box);
          labelEl.innerHTML = legend;
          labelEl.title = legend;

          mainOptions.forEach(({ label, title, onClick, id }) => {
            const button = L.DomUtil.create('button', `controlButton controlButton--${id}`, box);
            button.innerHTML = label;
            button.title = title;

            L.DomEvent.on(button, 'click', L.DomEvent.stopPropagation)
              .on(button, 'click', L.DomEvent.preventDefault)
              .on(button, 'click', onClick);
          });
        });

        return mainMenu;
      },
    });

    const control = new controlGroup({ position: 'topright' });
    control.addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}
