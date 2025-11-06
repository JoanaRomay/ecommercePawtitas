
import ProductosOfertas from '../components/ProductosOfertas';
import Info from '../components/Info';
import Slider2 from '../components/Slider2';
import '../App.css';
import ProductosDestacados from '../components/ProductosDestacados';
import CarruselMarcas from '../components/CarruselMarcas';  
import ChatBot from '../components/ChatBot';

function Home() {
  return (
    <main className="w-full">
      <Slider2 />
      <Info />
          <div className="w-[90%] mx-auto">
        <ProductosOfertas />
        <ProductosDestacados />
      </div>
          <CarruselMarcas />
          <ChatBot />
    </main>
  );
}


export default Home;
