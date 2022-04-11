from chalicelib.models.spotify_api.image import SpotifyImage
from chalicelib.models.spotify_api.playlist import SpotifyPlaylist, PlaylistTrack, PlaylistOwner


def get_example_playlist(name: str) -> SpotifyPlaylist:
    return SpotifyPlaylist(
        collaborative=False,
        description="",
        external_urls={},
        href="",
        id="",
        images=[SpotifyImage(height=0, width=0, url="")],
        name=name,
        owner=PlaylistOwner(display_name="", external_urls={}, href="", id="", type="", uri=""),
        primary_color=None,
        public=False,
        snapshot_id="",
        tracks=PlaylistTrack(href="", total=0),
        type="",
        uri="",
    )
