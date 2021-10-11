import ReactPaginate from 'react-paginate';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
/////
const baseURL = "/api/categories";

export default function Pagination() {
	const history = useHistory();
	//const [pages, setPage] = useState(null);
	const [offset, setOffset] = useState(0);
	const handleRoute = (page) =>{ 
		history.push("?page=" + page);
	}
	const handlePageClick = (e) => {
		const selectedPage = e.selected;
		setOffset(selectedPage + 1)
	};
	const pageCount = 3;
	/*React.useEffect(() => {
		axios.get(baseURL).then((response) => {
			setPage(2);
		});
	}, []);*/
  return (
    <div>
	<ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    
                    activeClassName={"active"}/>
    </div>
  );
}
