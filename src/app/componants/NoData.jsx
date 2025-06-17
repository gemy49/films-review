import React from 'react'
import Link from 'next/link.js';

export default function NoData({loading}) {
  console.log(loading);
  return (
   <div className="container py-4">
    {loading&& 
      <h1 className="mb-2 fw-bold  ">🎬 Your Watchlist</h1>
      }
    <div className="row d-flex justify-content-center text-center  py-4">
            <h1 style={{ fontSize: '12rem' }}>💔</h1>
            <h2>No movies in your watchlist</h2>
            <Link href={"/"} className="btn text-center btn-warning mt-4 col-sm-8 col-md-6 col-lg-4 rounded-pill p-2 fs-5">Go To Add Movies</Link >
          </div>
           </div>
  )
}
