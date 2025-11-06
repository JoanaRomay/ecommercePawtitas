import Footer from "../components/Footer";

export default function Nosotros() {
    return (
      <>
    
    <div className="     py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-cyan-600 mb-6">Sobre Pawtitas</h1>
      
      <div className="max-w-4xl bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          En <span className="font-semibold text-cyan-600">Pawtitas</span> nos apasiona cuidar a tus mascotas como si fueran parte de nuestra familia.
          Ofrecemos productos de calidad y servicios pensados para el bienestar y felicidad de tu peludo amigo.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Nuestro equipo está formado por amantes de los animales que entienden las necesidades especiales de cada mascota. 
          Desde alimentación hasta accesorios, tenemos todo lo que tu mascota necesita para crecer sana y feliz.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          ¡Gracias por confiar en nosotros para cuidar a quien más amas!  
        </p>
      </div>
    </div>

      </>        

  );
}
