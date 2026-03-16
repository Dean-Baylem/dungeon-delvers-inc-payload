'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useInteractiveMapStore } from '@/providers/interactive-map-provider';

const toggleActiveClass = (e: Event) => {
  const btn = e.currentTarget as HTMLButtonElement;
  btn.classList.toggle('active');
};

export default function InteractiveMapControls() {
  const map = useMap();
  const { showPins, toggleShowPins, toggleAddPinActive } = useInteractiveMapStore((state) => state);

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
                label: 'Show Pins',
                id: 'show-pins',
                title: 'Toggle Pins Display',
                onClick: (e: Event) => {
                  toggleActiveClass(e);
                  console.log(`Show Pins: ${showPins}`);
                  toggleShowPins();
                },
              },
              {
                label: 'Add New Pin',
                id: 'add-new-pin',
                title: 'Add New Pin',
                onClick: (e: Event) => {
                  toggleActiveClass(e);
                  toggleAddPinActive();
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
