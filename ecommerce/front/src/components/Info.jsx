import { Truck, MapPin, Clock, Globe } from 'lucide-react';

const Info = () => {
  return (
      <section className='bg-white'  >
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 py-6">

          {/* 1️⃣ Envío gratis */}
          <article className="flex items-center px-8 py-3 flex-1 min-h-[90px]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
              <Truck className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-5">
              <h3 className="text-base font-semibold text-gray-800">Envío gratis en CABA y GBA*</h3>
              <p className="text-gray-600 text-sm">Desde $33.000</p>
            </div>
          </article>

          {/* 2️⃣ Retiro gratis */}
          <article className="flex items-center px-8 py-3 flex-1 min-h-[90px]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
              <MapPin className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-5">
              <h3 className="text-base font-semibold text-gray-800">Retirá gratis</h3>
              <p className="text-gray-600 text-sm">En cualquiera de nuestras sucursales</p>
            </div>
          </article>

          {/* 3️⃣ Envío en el día */}
          <article className="flex items-center px-8 py-3 flex-1 min-h-[90px]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-5">
              <h3 className="text-base font-semibold text-gray-800">Recibí en el día</h3>
              <p className="text-gray-600 text-sm">En CABA y GBA* comprando de lunes a viernes hasta las 12hs</p>
            </div>
          </article>

          {/* 4️⃣ Envíos a todo el país */}
          <article className="flex items-center px-8 py-3 flex-1 min-h-[90px]">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
              <Globe className="w-6 h-6 text-teal-600" />
            </div>
            <div className="ml-5">
              <h3 className="text-base font-semibold text-gray-800">Envíos a todo el país</h3>
              <p className="text-gray-600 text-sm">Bonificados hasta 100% según zona y monto de compra</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default Info;
