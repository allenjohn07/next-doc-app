import { auth } from '@clerk/nextjs/server'
import React from 'react'
import IntroPage from './intro-page'
import NewDocument from './new-document'
import RecentDocument from './recent-document'

const Dashboard = () => {

  const { userId } = auth()

  if (!userId) {
    return <IntroPage />
  }

  return (
    <div>
      {/* New Document */}
      <NewDocument />
      {/* Recent Documents */}
      <RecentDocument />
    </div>
  )
}

export default Dashboard