import currencyFormatter from "currency-formatter";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { deleteWishList, getWishListById } from "../stores/action/wishList";

const MyWishListComponent = (props) => {
  const { data } = props;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentData, setCurrentData] = useState(null);
  const itemsPerpage = 3;

  const dispatch = useDispatch();
  useEffect(() => {
    const endOffset = itemOffset + itemsPerpage;
    setCurrentData(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerpage));
  }, [itemOffset, itemsPerpage, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerpage) % data.length;
    setItemOffset(newOffset);
  };

  const handleDeleteWishList = (id) => {
    dispatch(deleteWishList(id)).then(() => {
      dispatch(getWishListById(localStorage.getItem("idUser")));
    });
  };

  console.log(currentData);

  return (
    <>
      <div className="data">
        {currentData?.reverse().map((elem, index) => {
          return (
            <li
              key={elem.wishListId}
              className="d-flex justify-content-between py-3"
              style={{ borderBottom: "1px solid rgba(193, 197, 208, 0.25)" }}
            >
              <div
                className="modal py-5"
                id={`modal-wishList-${3 + index}`}
                tabIndex="-1"
                role="dialog"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title w-100 detail--event--header__modal text-center">
                        Detail Wishlist
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-12 text-center detail--event__title--style">
                          <h1>{elem.name}</h1>
                          <p>
                            <strong>Date you buy the ticket</strong> :{" "}
                            {
                              moment(elem.event.dateTimeShow)
                                .format("yyyy-ddd-mm")
                                .split("-")[1]
                            }
                            {`, `}
                            {moment(
                              elem.event.dateTimeShow.split("T").join(" ")
                            ).format("DD MMM YYYY, h:mm a")}
                          </p>

                          <p>
                            <strong>Event Location</strong> :{" "}
                            {elem.event.location}
                          </p>
                          <p>
                            <strong>Your Receipt</strong> : {elem.event.detail}
                          </p>
                          <p>
                            <strong>YOUR TOTAL PRICE</strong> :{" "}
                            {currencyFormatter.format(elem.event.price, {
                              code: "USD",
                            })}
                          </p>
                          <p>
                            <strong>Type Event</strong> : {elem.event.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="myWishlist--content__container d-flex w-100">
                <div
                  className="myBooking--date__container text-center"
                  style={{ height: "80px" }}
                >
                  <p style={{ color: "#FF8900" }}>
                    {
                      moment(elem.event.dateTimeShow)
                        .format("MMM DD YY")
                        .split(" ")[1]
                    }
                  </p>
                  <p
                    style={{
                      color: "#C1C5D0",
                      fontWeight: 500,
                      fontSize: "12px",
                    }}
                  >
                    {
                      moment(elem.event.dateTimeShow)
                        .format("yyyy-ddd-mm")
                        .split("-")[1]
                    }
                  </p>
                </div>
                <div className="myBooking--content__container">
                  <p>{elem.event?.name}</p>
                  <p>{elem.event?.location}</p>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#3366ff !important",
                      fontWeight: 600,
                      fontSize: "12px",
                    }}
                    href=""
                    data-toggle="modal"
                    data-target={`#modal-wishList-${3 + index}`}
                  >
                    Detail
                  </a>
                </div>
              </div>
              <div className="myWishlist--icon__container">
                <i
                  className="bi-heart m-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteWishList(elem.wishListId)}
                ></i>
              </div>
              <hr />
            </li>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </>
  );
};

export default MyWishListComponent;
