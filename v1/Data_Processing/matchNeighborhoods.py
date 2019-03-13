import os.path
import json

# print(os.path.abspath(os.path.join('.', os.pardir)))

with open(os.path.abspath('.') +
    '\\barcelona_neighborhoods_elliot.geojson') as f:
    data = json.load(f)
    data = json.dumps(data, indent = 2)
    
with open('.\\Data_Processing\\data.txt', 'w') as outfile:
    json.dump(data, outfile)