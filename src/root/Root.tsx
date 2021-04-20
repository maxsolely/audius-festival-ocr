import React, { useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { createWorker } from 'tesseract.js'

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
      const cleanString = text.replace(/[^a-zA-Z0-9 -]/g, '')
      const arrayOfNames = cleanString.split('-')
      console.log('🌈 ~ fileOCR ~ arrayOfNames', arrayOfNames)
      setArrayOfArtistNames(arrayOfNames)
    }
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
    </>
  )
}

export { Root }
