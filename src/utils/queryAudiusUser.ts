const queryAudiusUser = (artistName: string) => {
  const headers = {
    Accept: 'application/json',
  }

  return fetch(
    `https://discoveryprovider.audius5.prod-us-west-2.staked.cloud/v1/users/search?query=${artistName}&app_name=AUDIUS-FESTIVAL-OCR`,
    {
      method: 'GET',

      headers: headers,
    }
  )
    .then((res) => res.json())
    .then((body) => body)
}

export { queryAudiusUser }
