using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI_React.Modelos;

namespace WebAPI_React.Servicios
{
    public class RepositorioProducto : IRepositorio
    {
        private List<Producto> productos = new List<Producto>()
        {
            new Producto(){ Id = 1, Nombre="Prod 1", Descripcion="Descripcion 1", Categoria="Cat1", Cantidad=1, Precio=100.50},
            new Producto(){ Id = 2, Nombre="Prod 2", Descripcion="Descripcion 2", Categoria="Cat1", Cantidad=1, Precio=99.85},
            new Producto(){ Id = 3, Nombre="Prod 3", Descripcion="Descripcion 3", Categoria="Cat2", Cantidad=1, Precio=19.50},
            new Producto(){ Id = 4, Nombre="Prod 4", Descripcion="Descripcion 4", Categoria="Cat2", Cantidad=1, Precio=56.35},
            new Producto(){ Id = 5, Nombre="Prod 5", Descripcion="Descripcion 5", Categoria="Cat2", Cantidad=1, Precio=18.10}

        };
        public void Actualizar(Producto item)
        {
            int indx = productos.FindIndex(element => element.Id == item.Id);
            if (indx > -1)
            {
                productos.RemoveAt(indx);
                productos.Add(item);
            }
        }

        public void Agregar(Producto item)
        {
            productos.Add(item);
        }

        public void Borrar(int id)
        {
            int indx = productos.FindIndex(element => element.Id == id);
            if (indx > -1)
            {
                productos.RemoveAt(indx);
                
            }
        }

        public Producto BuscaPorId(int id)
        {
            Producto prod = productos.Find(element => element.Id == id);
            if (prod != null)
            {
                return prod;
            } else
            {
                return new Producto() { Id = -1, Nombre = "no existe producto", Descripcion = "", Categoria = "", Cantidad = -1, Precio = 0.0 };
            }
        }

        public List<Producto> BuscarTodos()
        {
            return productos;
        }
    }
}
