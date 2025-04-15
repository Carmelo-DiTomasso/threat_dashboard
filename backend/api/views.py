from django.http import JsonResponse
import requests
import os
from dotenv import load_dotenv

load_dotenv()

def search(request):
    # Get the user's input from the URL (default to google's IP)
    query = request.GET.get('query', '8.8.8.8')

    api_key = os.getenv('SHODAN_API_KEY')
    # make request to Shodan's IP lookup endpoint
    res = requests.get(
        f'https://api.shodan.io/shodan/host/{query}?key={api_key}'
    )

    # convert to JSON
    data = res.json()
    # return to frontend
    return JsonResponse(data)
