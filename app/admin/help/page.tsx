'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '@/app/config/api';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Custom_Page_Title from '@/app/custom/custom_page_title';

function HelpPage() {
  // Define Help type for strong typing
  type Help = {
    _id: string;
    topic: string;
    message: string;
    reply?: string;
  };
  const [helps, setHelps] = useState<Help[]>([]);
  const { t } = useTranslation()
  const [reply, setReply] = useState('');



  const fetchHelps = async () => {
    try {
      const res = await axios.get(`${api.baseUrl}api/v1/show/all/helps`);
      setHelps(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHelps();
  }, []);






  const handleReply = async (helpId: string) => {
    try {
      const res = await axios.post(`${api.baseUrl}api/v1/edit/help/${helpId}`, { reply });
      fetchHelps();
      toast.success(t('reply-success'));
    } catch (error) {
      toast.error(t('reply-failed'));
    }
  };





  return (
    <div>
      <Custom_Page_Title title={t('admin.help.title')} />
      {helps.length === 0 ? (
        <div>No help found.</div>
      ) : (
        helps.map((help) => (
          <div
            key={help._id}
            className={`relative p-6 rounded-2xl shadow-lg my-5 border transition-all duration-200 ${help.reply ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-xl shadow ${help.reply ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}> 
                {help.reply ? <span>✔️</span> : <span>❓</span>}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-800">{help.topic}</div>
                <div className="text-xs text-gray-500">{t('admin.help.topic')}</div>
              </div>
              <button
                className={`btn btn-sm ${help.reply ? 'btn-success' : 'btn-error'} px-4`}
                onClick={() => (document.getElementById(`modal_${help._id}`) as HTMLDialogElement)?.showModal()}
              >
                {help.reply ? t('admin.help.view-reply') : t('admin.help.reply')}
              </button>
            </div>
            <div className="mt-2 mb-1 flex items-center gap-2">
              <span className="text-gray-600"><strong>{t('admin.help.message')}:</strong></span>
              <span className="text-gray-800">{help.message}</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-gray-600"><strong>{t('admin.help.reply')}:</strong></span>
              <span className={`font-medium ${help.reply ? 'text-green-700' : 'text-red-400'}`}>{help.reply || t('no-reply')}</span>
            </div>
            <dialog id={`modal_${help._id}`} className="modal">
              <div className="modal-box max-w-md rounded-xl shadow-lg bg-white dark:bg-base-200">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-gray-200 dark:hover:bg-base-300 transition" aria-label="Close">✕</button>
                </form>
                <div className='flex flex-col mt-2'>
                  <label className="label mb-1">
                    <span className="label-text font-semibold text-base flex items-center gap-2">
                      <span className="text-primary">💬</span> {t('reply')}
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-24 mb-2"
                    onChange={(e) => setReply(e.target.value)}
                    placeholder={t('type-your-reply')}
                    defaultValue={help.reply || ''}
                  />
                  <button
                    className='btn btn-primary my-2 flex items-center gap-2 justify-center'
                    onClick={() => handleReply(help._id)}
                    type="button"
                  >
                    <span>📤</span> {t('send')}
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        ))
      )}
    </div>
  )
}


///show/all/helps

export default HelpPage