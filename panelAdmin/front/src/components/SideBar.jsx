import { Link } from 'react-router-dom'
import { Home, Users, Tag, LogOut } from "lucide-react"

function SideBar() {
  return (
      <>
          <div className=" flex items-center justify-center bg-[rgb(24,23,26)] text-white font-semibold w-2xs z-10">
             <div className="pt-10 flex flex-col h-[52.2rem] gap-4">
            <Link
                to="/dashboard"
                className="group inline-flex items-center pb-3 px-1 pt-1 border-b-2 border-transparent text-gray-300 text-xl hover:text-purple-400 hover:border-purple-500 dark:text-gray-300 dark:hover:text-white"
            >
                    <Home className="h-5 w-5 mr-1 text-gray-300 group-hover:text-purple-400" />
                        Dashboard
            </Link>

                    <Link to="/productos" className="group inline-flex items-center pb-3 px-1 pt-1 border-b-2 border-transparent text-gray-300 text-xl hover:text-purple-400 hover:border-purple-500 dark:text-gray-300 dark:hover:text-white"
>
                      <Users className="text-gray-300 group-hover:text-purple-400 h-5 w-5 mr-1" />
                      Productos
                    </Link>
                  <Link
                to="/categorias"
                className="group inline-flex items-center pb-3 px-1 pt-1 border-b-2 border-transparent text-gray-300 text-xl hover:text-purple-400 hover:border-purple-500 dark:text-gray-300 dark:hover:text-white"
                >
                <Tag className="h-5 w-5 mr-1 text-gray-300 group-hover:text-purple-400" />
                Categorías
                </Link>

                  { /*<Link to="/ordenes" className="inline-flex pb-3 px-1 pt-1 border-b-2 border-transparent text-gray-300 text-xl hover:text-gray-700 hover:border-orange-300 dark:text-gray-300 dark:hover:text-white">
                      <Tag className="text-gray-300 h-5 w-5 mr-1" />
                      Ordenes
                  </Link>*/}
                  <Link to="/administradores"  className="group inline-flex items-center pb-3 px-1 pt-1 border-b-2 border-transparent text-gray-300 text-xl hover:text-purple-400 hover:border-purple-500 dark:text-gray-300 dark:hover:text-white"
>
                      <Tag className="h-5 w-5 mr-1 text-gray-300 group-hover:text-purple-400" /> 
                      Administradores
                  </Link>
                  <Link
  to="/clientes"
  className="group inline-flex items-center pb-3 px-1 pt-1 border-b-2 border-transparent text-gray-300 text-xl hover:text-purple-400 hover:border-purple-500 dark:text-gray-300 dark:hover:text-white"
>
  <Users className="h-5 w-5 mr-1 text-gray-300 group-hover:text-purple-400" />
  Clientes
</Link>

                  </div>
        </div>
     
      </>
      
      

  )
}

export default SideBar