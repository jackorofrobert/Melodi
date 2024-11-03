import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Slider = ({ array_image }) => {
  const data = [
    {
      image:
        "https://images.spiderum.com/sp-images/57559e00615611e7be8d59a5a1121573.jpg",
      name: "Sơn Tùng MTP",
      id: "",
    },
    {
      image:
        "https://images.tkbcdn.com/2/1560/600/Upload/eventcover/2023/11/01/A3EC1E.jpg",
      name: "Mr.Siro",
      id: "",
    },
    // {
    //   image:
    //     "https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/437956694_830596849111470_5857776155345912873_n.png?stp=dst-png_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=N48K30B2a1AQ7kNvgFz2AMd&_nc_zt=23&_nc_ht=scontent.fhan3-5.fna&_nc_gid=A4sOrVfjsJNWNyMj-e1QdX7&oh=00_AYDWAQRDxn6Luvvnu9HrsrpFBR_T9s28CDloVdDveI3e_Q&oe=6712F31D",
    //   name: "Mỹ Tâm",
    //   id: "",
    // },
    {
      image:
        "https://bookkol.com/wp-content/uploads/2023/01/banner-ha-anh-tuan.jpg",
      name: "Hà Anh Tuấn",
      id: "",
    },
  ];
  // const images = [
  //   "https://s3-alpha-sig.figma.com/img/668e/2b1c/772a8122dc26a4eec94be1beca1eb5ca?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pl8dLqRtvQw6BfA71JVxiRvIUyHq2txCDbEPmU-FfP0XpPHNhwXH6AZ43ZAt3YcKNAtBM0igMwTLCgVjRCR8jWIOMho4CA3fozWWLvOVX-fXmFd3luGdGp9VsUKFX3m-qgsOoOx2kkN53SDijQxXfI2k5cfOzNHkrssnXKWQP9Ed~E768nUhQPzxMLSebIBwF6IYttyh1PHxfF7f1QH63NfOaSX91b4oKrKZIIA6k-K5X6pxh1TKxIbOYPjvHTPAnzkzdsajesw4GyVYl~I-WG8imuMSh3hNxp1zUhm8j44n1TSGn4Y9vVF1O4y4mqYgX3twF14oDWAr738lLvs8wA__",
  //   "https://image.tienphong.vn/600x315/Uploaded/2024/ttf-cgkztztg/2024_05_31/red-modern-cat-kitten-magazine-cover-newsletter-13-3256.png",
  //   "https://images.tkbcdn.com/2/1560/600/Upload/eventcover/2023/11/01/A3EC1E.jpg",
  // ];
  return (
    <div className="w-full flex justify-center items-center my-8">
      <div className="w-[95%] h-[400px]  rounded-lg p-4 relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          className="h-full relative" // Thêm relative vào đây
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex justify-between items-center h-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)),url(${item.image})`,
                  backgroundPosition: "right center, left center",
                }} // Set background image here
              >
                {/* Overlay màu tối để làm nổi bật chữ */}
                <div className="w-full h-full flex justify-between items-center p-4 rounded-lg mt-32">
                  {/* Nội dung phía bên trái */}
                  <div className="w-1/2 text-white p-4">
                    <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
                    <p className="mb-6">
                      You can have easy access to every song of {item.name} by
                      just clicking on the{" "}
                      <span className="text-pink-500 font-bold">
                        Listen now
                      </span>{" "}
                      button. You can also{" "}
                      <span className="text-cyan-400 font-bold">follow</span>{" "}
                      her to support and keep up with what she does.
                    </p>
                    <div className="flex space-x-4">
                      <button className="px-6 py-2 border-2 border-pink-500 text-pink-500 font-bold rounded-lg hover:bg-pink-500 hover:text-white">
                        Listen Now
                      </button>
                      <button className="px-6 py-2 border-2 border-cyan-500 text-cyan-500 font-bold rounded-lg hover:bg-cyan-500 hover:text-white">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
