def get_base_url(current_request):
    headers = current_request.headers
    return "%s://%s/%s" % (headers["x-forwarded-proto"], headers["host"], current_request.context["stage"])
