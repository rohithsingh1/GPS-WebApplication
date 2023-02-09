import React from 'react'

function Pagination({totalPages,currentPage,setCurrentPage}) {
  return (
      <div>
          <ul className="container-fluid pagination justify-content-end">
              <li className={currentPage<=1? "page-item disabled":"page-item"} onClick={() => {
                  currentPage>1 && (setCurrentPage(currentPage-1))
              }}>
                <span className="page-link">Prev</span>
            </li>
              <li className="page-item active" aria-current="page">
                  <span className="page-link">{currentPage}</span>
              </li>
              <li className={currentPage>=totalPages? "page-item disabled":"page-item"} onClick={() => {
                  currentPage<totalPages && setCurrentPage(currentPage+1)
              }} >
      <span className="page-link">Next</span>
    </li>
  </ul>
    </div>
  )
}

export default Pagination