from django.http import JsonResponse
from django.views import View

class NgramsView(View):
    def get(self, request, *args, **kwargs):
        # Calculate ngrams using NLTK
        ngrams = ["apple", "banana", "cherry"]  # Replace with actual ngrams
        return JsonResponse(ngrams, safe=False)
