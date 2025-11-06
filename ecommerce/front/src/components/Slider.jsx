import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import '../App.css';

export default function Slider() {
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
             
        }}
        speed={600}
        parallax={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <div className="title" data-swiper-parallax="-300">
                Todo lo que necesitas para su cuidado
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Desde alimentos hasta accesorios, tenemos todo para el bienestar de tus mascotas.
              </div>
            </div>
            <div className="img-container">
              <img className="slider-img" src="img/imgBanner1.jpg" alt="Mascotas" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <div className="title" data-swiper-parallax="-300">
                Mimos, juegos y comida rica
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Elegí entre cientos de productos para perros y gatos. ¡Tu compañero lo merece!
              </div>
            </div>
            <div className="img-container">
              <img className="slider-img" src="img/imgBanner2.jpg" alt="Mascotas jugando" />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-content">
            <div className="text-content">
              <div className="title" data-swiper-parallax="-300">
                Juguetes, snacks y más
              </div>
              <div className="subtitle" data-swiper-parallax="-200">
                Encuentra alimentos premium, juguetes divertidos y accesorios de calidad para tus compañeros peludos.
              </div>
            </div>
            <div className="img-container">
              <img className="slider-img" src="img/imgBanner3.jpg" alt="Juguetes para mascotas" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
