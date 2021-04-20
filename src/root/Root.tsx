import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import { createWorker } from 'tesseract.js'
import { getAudiusUsersTracks, getStreamOfTrack, queryAudiusUser } from '../utils'

const Root: React.FC<Record<string, never>> = () => {
  const [arrayOfArtistNames, setArrayOfArtistNames] = useState<string[]>([])
  const worker = createWorker({
    logger: (m) => console.log(m),
  })

  const fileOCR = async (file: any) => {
    if (file.length) {
      await worker.load()
      await worker.loadLanguage('eng')
      await worker.initialize('eng')
      const {
        data: { text },
      } = await worker.recognize(file[0])
      console.log('text ->', text)
      const cleanString = text.replace(/[^a-zA-Z0-9 _-]/g, '')
      console.log('🌈 ~ fileOCR ~ cleanString', cleanString)
      const arrayOfNames = cleanString.split('-')
      console.log('🌈 ~ fileOCR ~ arrayOfNames', arrayOfNames)
      setArrayOfArtistNames(arrayOfNames)
    }
  }

  const handleQueryAudiusUser = async (artistName: string) => {
    const response = await queryAudiusUser(artistName)
    console.log('🌈 ~ handleQueryAudiusUser ~ response', response)
    const usersId = response.data[0].id
    const tracksResponse = await getAudiusUsersTracks(usersId)
    const usersTop5Tracks = tracksResponse.data
      .sort(
        (trackObjectA: any, trackObjectB: any) => trackObjectA.play_count < trackObjectB.play_count
      )
      .slice(0, 5)
    console.log('🌈 ~ handleQueryAudiusUser ~ usersTop5Tracks', usersTop5Tracks)
    console.log(usersTop5Tracks[0].id)
    new Audio(
      `https://discoveryprovider.audius.co/v1/tracks/${usersTop5Tracks[0].id}/stream?app_name=AUDIUS-FESTIVAL-OCR`
    ).play()
    // await getStreamOfTrack(usersTop5Tracks[0].id)
  }

  return (
    <>
      <div>Hello there</div>
      <DropzoneArea
        alertSnackbarProps={{
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        }}
        acceptedFiles={['image/*']}
        dropzoneText="Drag and drop your festival lineup bill 👩‍🎤. Or click to choose"
        filesLimit={1}
        maxFileSize={5000000}
        onChange={(file) => fileOCR(file)}
      />
      <Button variant="contained" color="primary" onClick={() => handleQueryAudiusUser('Oshi')}>
        Oshi
      </Button>
    </>
  )
}

export { Root }
