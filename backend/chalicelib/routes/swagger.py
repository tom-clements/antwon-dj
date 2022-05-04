import json

from chalice import Blueprint, Response

swagger_routes = Blueprint(__name__)


@swagger_routes.route("/model.json", methods=["GET"], cors=True)
def get_swagger_model() -> str:

    with open("chalicelib/public/model.json", "r") as f:
        model = json.load(f)

    return model


@swagger_routes.route("/", methods=["GET"])
def get_swagger_page() -> Response:

    with open("chalicelib/public/swagger_page.html", "r") as f:
        html = f.read()

    return Response(
        body=html,
        status_code=200,
        headers={"Content-Type": "text/html"},
    )
