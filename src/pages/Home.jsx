import React, { useState, useEffect } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "../components/Pagination";
import { MdOutlineZoomInMap } from "react-icons/md";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { BsCloudDownload } from "react-icons/bs";
function Home() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(false);
  const [currimg, setCurrimg] = useState(0);

  useEffect(() => {
    const getAllImages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos?page=${page}&client_id=ydjKTK2QAfCVnCG6Qg4tsHvskQuc9yeZmn6USa_g3M8`
        );
        const data = res.data;
        setImages(data);
        console.log(data);
        setLoading(false);
      } catch (error) {}
    };
    getAllImages();
  }, [page]);
  const handlePageNext = () => {
    setPage(page + 1);
  };
  const handlePagePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      window.alert("you are already at page1");
    }
  };
  const handleClick = (ind) => {
    setCurrimg(ind);
    setZoom(!zoom);
  };

  return (
    <div className="w-full bg-slate-900 p-2 mx-auto flex flex-col justify-center items-center">
      <div className="text-center text-3xl p-2 text-white">Gallery</div>
      {loading && <LinearProgress color="secondary" />}
      {zoom ? (
        <div className="mt-5 w-full bg-  mb-5">
          <div className="action text-center flex items-center justify-around mb-3">
            <div
              className="text-white flex gap-3 items-center justify-center text-xl"
              onClick={() => {
                setCurrimg(currimg === 0 ? 9 : currimg - 1);
              }}
            >
              <FcPrevious className="scale-100 hover:scale-150 ease-in duration-200 cursor-pointer" />
            </div>
            <span
              onClick={() => {
                setZoom(!zoom);
              }}
            >
              <MdOutlineZoomInMap className="text-white scale-100 hover:scale-150 ease-in duration-200 cursor-pointer" />
            </span>
            <div className="text-white  items-center justify-center">
              <a href={images[currimg].urls.full} download>
                <BsCloudDownload className="text-white scale-100 hover:scale-150 ease-in duration-200 cursor-pointer" />
              </a>
            </div>
            <span
              className="text-white flex gap-3 items-center justify-center"
              onClick={() => {
                setCurrimg(currimg === 9 ? 0 : currimg + 1);
              }}
            >
              <FcNext className="scale-100 hover:scale-150 ease-in duration-200 cursor-pointer" />
            </span>
          </div>
          <div
            onClick={() => {
              setZoom(!zoom);
            }}
            className="image h-[600px] overflow-hidden"
          >
            <img
              className="object-contain "
              src={images[currimg].urls.full}
              alt=""
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-wrap gap-2 ">
        {images.map((image, ind) => (
          <div
            onClick={() => {
              handleClick(ind);
            }}
            className="w-[400px] md:w-[290px] h-[300px] overflow-hidden"
          >
            <img
              className="w-[300px] h-[300px] rounded-md"
              src={image.urls.small}
              alt=""
            />
          </div>
        ))}
      </div>
      <Pagination
        cpage={page}
        handlePageNext={handlePageNext}
        handlePagePrev={handlePagePrev}
      />
    </div>
  );
}

export default Home;
