const getStreamOfTrack = (trackID: string) =>
  fetch(
    `https://discoveryprovider.audius5.prod-us-west-2.staked.cloud/v1/tracks/${trackID}/stream?app_name=AUDIUS-FESTIVAL-OCR`,
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((body) => body)

export { getStreamOfTrack }
