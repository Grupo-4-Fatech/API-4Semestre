import Campo from '../../components/Campo'
import { Header } from '../../components'
import { MdSend } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider'
import Select from '../../components/Select';





export default function CreateTeams() {

    const { currentColor } = useStateContext();
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Teams" />
            <Campo text="Team name" placeholder="Name" type={"text"} />
            <Select dados={['Antonio', 'João']} text={'Slect user'} />
            <div className='my-6'> <Campo text="Description" placeholder="Description" type={"text"} /></div>

            <div className="mt-5 mb-5 flex" >
                <button style={{ backgroundColor: currentColor, position: 'absolute' }} className="text-white font-bold py-2 px-4 rounded inline-flex items-center right-20" >
                    <span className='pr-1'>Create</span>
                    <MdSend />
                </button>
            </div>

        </div>
    )

}
