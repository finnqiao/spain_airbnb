import os
import pandas as pd
import numpy as np

city = 'Madrid'
fileLocation = r'C:\Users\aburz\Desktop\\'+ city + r'\Calendar Archive\\'

calFiles = [f for f in os.listdir(fileLocation)
    if os.path.isfile(fileLocation + f) and f.endswith('.csv') and
    not f.startswith('listing') and not f.startswith('summary') and
    f.find('20180117') > -1]

# print(calFiles)

listingFiles = [f for f in os.listdir(fileLocation)
    if os.path.isfile(fileLocation + f) and f.endswith('.csv') and
    f.startswith('listing') and f.find('20180117') > -1]

for i in range(len(calFiles)):
    df = pd.read_csv(fileLocation + calFiles[i])
    dfListing = pd.read_csv(fileLocation + listingFiles[i])

    df['file'] = calFiles[i].replace('.csv', '')
    df['date'] = pd.to_datetime(df['date'], format = '%Y-%m-%d')
    available = {'t': True, 'f': False}
    df['available'] = df['available'].map(available)
    df['price'] = pd.to_numeric(df['price']
        .str.replace('$', '').str.replace(',', ''))

    dfListing = dfListing[['id', 'neighbourhood']]

    df = pd.merge(left = df, right = dfListing, how = 'left',
        left_on = 'listing_id', right_on = 'id')
    # df = df.drop(['listing_id', 'id'], axis = 1)

    # df = df.groupby(['file', 'date', 'neighbourhood']).agg(['mean', 'count'])
    abrantes = df[df['neighbourhood'] == 'Abrantes']
    # print(abrantes)

    abrantes.to_csv(fileLocation + 'abrantes.csv', encoding = 'utf-8')