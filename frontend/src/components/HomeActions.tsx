import { Suspense, useState } from 'react'
import { useRecoilState } from 'recoil'
import { loadingAtom } from '../atoms/ui'
import { useToast } from '../hooks/toast'
import DownloadDialog from './DownloadDialog'
import HomeSpeedDial from './HomeSpeedDial'
import TemplatesEditor from './TemplatesEditor'

const HomeActions: React.FC = () => {
  const [, setIsLoading] = useRecoilState(loadingAtom)

  const [openDownload, setOpenDownload] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)

  const { pushMessage } = useToast()

  return (
    <>
      <HomeSpeedDial
        onDownloadOpen={() => setOpenDownload(true)}
        onEditorOpen={() => setOpenEditor(true)}
      />
      <Suspense>
        <DownloadDialog
          open={openDownload}
          onClose={() => {
            setOpenDownload(false)
            setIsLoading(true)
          }}
          onDownloadStart={(url) => {
            pushMessage(`Requested ${url}`, 'info')
            setOpenDownload(false)
            setIsLoading(true)
          }}
        />
      </Suspense>
      <TemplatesEditor
        open={openEditor}
        onClose={() => setOpenEditor(false)}
      />
    </>
  )
}

export default HomeActions