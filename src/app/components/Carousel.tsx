'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Product } from '../types/product';
import ProductCard from '../products/components/ProductCard';

export default function Carousel({ productList }: { productList: Product[] }) {
  return (
    <Swiper
      grabCursor={true}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Navigation]}
      className='mySwiper'
    >
      {productList.map((product: Product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
