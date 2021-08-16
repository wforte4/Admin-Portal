import React from 'react'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps, router}) {
  const [loading, setLoading] = useState(false)
  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))
  Router.events.on('routeChangeError', ()=> setLoading(false))
  return (
      <Component {...pageProps}></Component>
  )
}

export default MyApp