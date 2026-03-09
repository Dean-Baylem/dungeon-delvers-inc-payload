'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { documentDrawerBaseClass } from '@payloadcms/ui';

const toggleActiveClass = (e: Event) => {
  const btn = e.currentTarget as HTMLButtonElement;
  btn.classList.toggle('active');
};

export default function InteractiveMapControls() {
  const map = useMap();

  useEffect(() => {
    const controlGroup = L.Control.extend({
      onAdd: function () {
        const mainMenu = L.DomUtil.create('div', 'leaflet-bar mapControls');

        const menuOptions = [
          {
            legend: 'Display Actions',
            groupClass: 'mapControls--displayOptions',
            mainOptions: [
              {
                label: 'Show Regions',
                id: 'show-regions',
                title: 'Toggle Regions Display',
                onClick: (e: Event) => {
                  toggleActiveClass(e);
                },
              },
              {
                label: 'Show Pins',
                id: 'show-pins',
                title: 'Toggle Pins Display',
                onClick: (e: Event) => {
                  toggleActiveClass(e);
                  console.log('Toggle Pins Display');
                },
              },
              {
                label: 'Add New Pin',
                id: 'add-new-pin',
                title: 'Add New Pin',
                onClick: (e: Event) => {
                  toggleActiveClass(e);
                  const newRegionBtn = document.getElementById('add-new-region');
                  if (newRegionBtn) {
                    newRegionBtn.classList.remove('active');
                  }
                },
              },
              {
                label: 'Add New Region',
                id: 'add-new-region',
                title: 'Add New Region',
                onClick: (e: Event) => {
                  toggleActiveClass(e);
                  const newPinBtn = document.getElementById('add-new-pin');
                  if (newPinBtn) {
                    newPinBtn.classList.remove('active');
                  }
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
            button.id = id;

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
