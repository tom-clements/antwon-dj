def get_base_url(current_request):
    host = current_request.headers['host']
    if host.split(':')[0] == "127.0.0.1":
        return f"http://{host}"
    stage = current_request.context['stage']
    base_url = f"https://{host}/{stage}"
    return base_url
