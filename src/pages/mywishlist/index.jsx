import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishListById } from "../../stores/action/wishList";
import MyWishListComponent from "../../component/MyWishListComponent";

const MyWishlist = () => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);

  useEffect(() => {
    (async () =>
      await dispatch(getWishListById(localStorage.getItem("idUser"))))();
  }, []);

  console.log(wishList.data);
  return (
    <>
      <div className="col-12 d-flex justify-content-between">
        <p className="">My Wishlist</p>
      </div>
      {wishList.data.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center container--profile--user__size d-flex align-items-center flex-column justify-content-center">
            <p>No Tickets bought</p>
            <p className="text-secondary">
              it appears you havent bought any tickets
            </p>
            <p className="text-secondary">yet. Maybe try searching these?</p>
          </div>
        </div>
      ) : (
        <ul>
          <MyWishListComponent data={wishList.data} />
          {/* {wishList.data?.map((elem) => (
            <li
              key={elem.wishListId}
              className="d-flex justify-content-between py-3"
              style={{ borderBottom: "1px solid rgba(193, 197, 208, 0.25)" }}
            >
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
                  <a href="">Detail</a>
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
          ))} */}
        </ul>
      )}
    </>
  );
};

export default MyWishlist;
