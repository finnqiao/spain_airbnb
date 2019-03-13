import gzip
import shutil
import os

city = 'Madrid'
fileLocation = r'C:\Users\aburz\Desktop\\' + city + r'\Calendar Archive\\'

files = [fileLocation + f for f in os.listdir(fileLocation)
    if os.path.isfile(fileLocation + f) and f.endswith('.csv.gz')]
# print(files)

for f in files:
    with gzip.open(f, 'rb') as f_in:
        with open(f.replace('.gz', ''), 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)