import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import useUserStore from './Store'

const History = () => {
    const { history, fetchedUser, setFetchedUser } = useUserStore()
    const navigate = useNavigate()

    const openProfile = (item) => {
      // Set as current user and go to profile view
      setFetchedUser({
        ...fetchedUser,
        ...item,
      })
      navigate('/profileview', { state: { fetchedData: item, searchUser: item.login } })
    }

    const { clearHistory } = useUserStore.getState()

  return (
    <React.Fragment>
        <div className='pt-24 pb-24 px-4 flex justify-center'>
          <div className='w-full max-w-4xl bg-white rounded-xl shadow-md p-6'>
            <div className='flex items-center justify-between mb-2 gap-2'>
              <h2 className='text-2xl font-semibold text-slate-900'>Search History</h2>
              {history.length > 0 && (
                <button
                  type='button'
                  onClick={clearHistory}
                  className='text-xs sm:text-sm px-3 py-1 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100'
                >
                  Clear all
                </button>
              )}
            </div>
            <p className='text-sm text-slate-600 mb-4'>
              This section will show the list of GitHub profiles you have searched for.
            </p>
            <div className='border-t border-slate-200 pt-4'>
              {history.length === 0 ? (
                <p className='text-slate-500 text-sm'>
                  You have not searched for any profiles yet. Try searching from the home page.
                </p>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {history.map((item) => (
                    <button
                      key={item.login}
                      type='button'
                      onClick={() => openProfile(item)}
                      className='flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left'
                    >
                      <img
                        src={item.avatar_url}
                        alt={item.login}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <div className='flex flex-col'>
                        <span className='font-semibold text-slate-900'>{item.login}</span>
                        {item.name && (
                          <span className='text-xs text-slate-500 truncate'>{item.name}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer/>
    </React.Fragment>
  )
}

export default History