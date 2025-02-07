from helpers.databasemanager import DatabaseManager
import math

def calculateDistance(lat1, long1, lat2, long2):
    '''
    Calculates the distance between two lat and long using Haversine formula.
    '''
    
    deg2Rad = lambda deg : deg * (math.pi / 180)
    radiusOfEarthInKM = 6371
    dLat = deg2Rad(lat2 - lat1)
    dLon = deg2Rad(long2 - long1)
    a = math.sin(dLat/2) * math.sin(dLat/2) + math.cos(deg2Rad(lat1)) * math.cos(deg2Rad(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    d = radiusOfEarthInKM * c #distance in km
    return d

def getNearestHospitalDistance(latitude : float, longitude : float,  maxRangeInKm = 10) -> list:
    '''
    Returns all hospital IDs within maxRange
    '''
    nearestHospitalIDs = []
    dbMan = DatabaseManager()
    allHospitalCoordinates = dbMan.getAllHospitalCoordinates()

    #Need some threading for optimization
    for h in allHospitalCoordinates:
        d = calculateDistance(lat1=latitude, long1=longitude, lat2=float(h["coordinates"][0]), long2=float(h["coordinates"][1]))
        if d <= maxRangeInKm:
            nearestHospitalIDs.append(h["hospitalID"])
    
    return nearestHospitalIDs