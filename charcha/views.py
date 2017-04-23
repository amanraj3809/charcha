from __future__ import unicode_literals, absolute_import
from django.http.response import HttpResponse

from django.views.decorators.cache import never_cache
from django.template.loader import get_template

def health_check(request):
    return HttpResponse("OK", status=200)


@never_cache
def charcha_serviceworker(request, js):
    template = get_template('charcha-serviceworker.js')
    html = template.render()
    return HttpResponse(html, content_type="application/x-javascript")