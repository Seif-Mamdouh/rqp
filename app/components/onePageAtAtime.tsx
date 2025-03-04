import React, { useState } from 'react'


interface OnePageAtAtimeProps {
    onPageNext: (page: number) => void
    onPagePrev: (page: number) => void
    disabledNext: boolean
    disabledPrev: boolean
}

const OnePageAtAtime = ({onPageNext, onPagePrev, disabledNext, disabledPrev}: OnePageAtAtimeProps) => {
    const [page, setPage] = useState(0)

    const handlePageNext = () => {
        setPage(page + 1)
        onPageNext(page + 1)
    }

    const handlePagePrev = () => {
        setPage(page - 1)
        onPagePrev(page - 1)
    }
    

  return (
    <div>
        <button onClick={handlePagePrev} disabled={disabledPrev}>prev</button>
        <p>Page {page + 1}</p>
        <button onClick={handlePageNext} disabled={disabledNext}>next</button>
    </div>
  )
}

export default OnePageAtAtime
