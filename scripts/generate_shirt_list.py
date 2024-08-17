import os
import json
from pathlib import Path

def generate_shirt_list():
    directory = Path('assets/shirts')
    shirts = []
    id_counter = 1

    for file in directory.glob('*.svg'):
        name = file.stem.replace('-', ' ').title()
        shirts.append({
            'id': id_counter,
            'name': name,
            'price': 20,  # You may want to implement a pricing strategy
            'type': 'shirts',
            'svg': f'https://sxdgoth.github.io/mwahbaby/assets/shirts/{file.name}'
        })
        id_counter += 1

    with open('shirt_list.json', 'w') as f:
        json.dump(shirts, f, indent=2)

if __name__ == "__main__":
    generate_shirt_list()
