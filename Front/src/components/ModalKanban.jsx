import React from 'react';

const ModalKanban = ({ title, description, classification }) => {

  const [showModal, setShowModal] = React.useState(true);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="relative items-start justify-between p-5 pb-0 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold p-1">
                    {title}
                  </h3>
                  <div className='px-2'>
                    {classification == 'Hotfix' ?
                      <span className="p-1 text-[13px] rounded-full bg-red-500 text-white">{classification}</span>
                      :
                      <span className="p-1 text-[13px] rounded-full bg-cyan-400 text-white">{classification}</span>
                    }
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div id='description' className="relative p-6 flex-auto" dangerouslySetInnerHTML={{ __html: description }} />
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ModalKanban;