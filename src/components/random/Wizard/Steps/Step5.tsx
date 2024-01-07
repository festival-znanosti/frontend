import Calendar from '../../Calendar/Calendar'
import PageTitle from '../../PageTitle'
import Stepper from '../Stepper'
import { useWizardContext } from '../Wizard.context'

import { EventFormSchemaType } from '@/app/(required-auth)/new-form/page'

const Step5 = () => {
  const { form } = useWizardContext<EventFormSchemaType>()
  return (
    <>
      <div className="mt-[80px] w-full flex-1">
        <PageTitle title="Vrijeme izvođenja događaja" description="Unesite vrijeme izvođenja događaja" />
        <br />
        <Calendar />
        <div className="p-4" />
      </div>
      <Stepper trigger={() => form.trigger(['locationId'])} />
    </>
  )
}

export default Step5
