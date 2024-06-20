import os
import json
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import Normalize, Colormap
from multiprocessing import Pool

def create_density_map(poi_file, center_lat, center_lon, size, resolution):
    density_map = np.zeros((size, size))

    pixel_size = resolution / size

    center_x = int(size / 2)
    center_y = int(size / 2)

    with open(poi_file) as f:
        pois = json.load(f)
        for poi in pois:
            lat = poi['lat']
            lon = poi['lon']
            x = int((lon - center_lon) / pixel_size) + center_x
            y = int((lat - center_lat) / pixel_size) + center_y
            if 0 <= x < size and 0 <= y < size:
                density_map[y, x] += 1

    return density_map[::-1]  # This is needed to get the correct orientation of the map flipped

def plot_density_map(args):
    density_map, resolution, poi_type, output_folder, vmax = args
    norm = Normalize(vmin=0, vmax=vmax) 
    colormap = plt.cm.hot_r 
    plt.imshow(density_map, cmap=colormap, norm=norm, extent=[-resolution/2, resolution/2, -resolution/2, resolution/2])
    plt.colorbar(label='Density')
    plt.xlabel('Longitude (degrees)')
    plt.ylabel('Latitude (degrees)')
    plt.title(f'POI Density Map ({poi_type})')
    output_path = os.path.join(output_folder, f"{poi_type}_density_map.png")
    plt.savefig(output_path, dpi=600)  
    plt.close()
    print(f"Density map saved: {output_path}")

if __name__ == "__main__":
    poi_folder = "poi_NewYorkOpenMaps"
    output_folder = "density_maps"
    center_lat = 40.7580  # Manhattan center latitude
    center_lon = -73.9855  # Manhattan center longitude
    size = 75  
    resolution = 0.2
    vmax = 100 

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    args_list = []
    for poi_file in os.listdir(poi_folder):
        if poi_file.endswith(".json"):
            poi_type = poi_file.split('.')[0].capitalize()  
            poi_file_path = os.path.join(poi_folder, poi_file)
            args_list.append((create_density_map(poi_file_path, center_lat, center_lon, size, resolution), resolution, poi_type, output_folder, vmax))

    with Pool() as pool:
        pool.map(plot_density_map, args_list)
