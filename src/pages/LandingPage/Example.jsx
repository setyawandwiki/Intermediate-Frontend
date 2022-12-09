import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardEvent from "../../component/CardEvent";
import axios from "../../utils/axios";

function Example() {
  const navigate = useNavigate();
  // const data = [
  //   { id: 1, name: "milk", category: "drink" },
  //   { id: 2, name: "juice", category: "drink" },
  //   { id: 3, name: "coffee", category: "drink" },
  // ];

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDataProduct();
  }, []);

  useEffect(() => {
    getDataProduct();
  }, [page]);

  const getDataProduct = async () => {
    try {
      const result = await axios.get(
        `product?searchName=&sort=&limit=5&page=${page}&searchDateCreated=`
      );

      setData(result.data.data);
      setPagination(result.data.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleDetailProduct = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <>
      {/* START MAIN */}
      <main className="container d-flex gap-3">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id}>
              <CardEvent item={item} handleDetail={handleDetailProduct} />
            </div>
          ))
        ) : (
          <div className="text-center">
            <h3>Data Not Found !</h3>
          </div>
        )}
      </main>
      <div className="d-flex gap-2 justify-content-center w-100 my-5">
        <button className="btn btn-primary" onClick={handlePrevPage}>
          &lt;
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={page === pagination.totalPage ? true : false}
        >
          &gt;
        </button>
      </div>

      {/* END MAIN */}
    </>
  );
}

export default Example;
