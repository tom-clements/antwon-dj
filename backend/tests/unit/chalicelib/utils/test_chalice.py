from chalicelib.utils.chalice import get_api_url


def test_get_api_url():
    expected = "https://api.djantwon.com/dev"
    actual = get_api_url()
    assert actual == expected
