import json
import requests
import numpy as np
from django.http import JsonResponse
from sklearn.cluster import KMeans
from django.views.decorators.csrf import csrf_exempt

# Define your API key
API_KEY = 'AlzaSyA6OARNW6uKqx_gFXorv0kXGaGZSx7ozMR'

def get_location_from_name(place_name):
    """Convert place name to latitude and longitude using Google Maps API"""
    url = f'https://maps.gomaps.pro/maps/api/place/textsearch/json?query={place_name}&key={API_KEY}'
    response = requests.get(url)
    data = response.json()
    
    if data['results']:
        location = data['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    return None, None

def get_nearby_hotels(lat, lng, radius=2000):
    """Fetch hotels near a given location (lat, lng)"""
    url = f'https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=lodging&key={API_KEY}'
    response = requests.get(url)
    
    if response.status_code != 200:
        return []

    data = response.json()
    hotels = []
    for result in data.get('results', []):
        if result.get('business_status') == 'OPERATIONAL' and 'lodging' in result.get('types', []):
            hotels.append({
                'name': result['name'],
                'address': result.get('vicinity', 'Address not available'),
                'price_level': result.get('price_level', 'Unknown'),
                'rating': result.get('rating', 'N/A'),
                'lat': result['geometry']['location']['lat'],
                'lng': result['geometry']['location']['lng']
            })
    return hotels

def calculate_kmeans_clusters(tourist_places, n_clusters=1):
    """Calculate centroids of tourist places using K-means clustering"""
    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(tourist_places)
    return kmeans.cluster_centers_

@csrf_exempt
def find_hotels(request):
    """Django API endpoint to process locations and return hotels JSON"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            locations = data.get('locations', [])

            # Get lat/lng for each tourist place
            tourist_places = []
            for place_name in locations:
                lat, lng = get_location_from_name(place_name)
                if lat is not None and lng is not None:
                    tourist_places.append((lat, lng))

            if not tourist_places:
                return JsonResponse({'error': 'No valid tourist places found'}, status=400)

            # Find the best hotel locations
            centroids = calculate_kmeans_clusters(tourist_places, n_clusters=1)
            hotels = get_nearby_hotels(centroids[0][0], centroids[0][1])
            
            return JsonResponse({'hotels': hotels, 'best_location': centroids.tolist()})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

