using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI_React.Modelos;

namespace WebAPI_React.Servicios
{
    public interface IRepositorio
    {
        void Agregar(Producto item);
        void Actualizar(Producto item);
        void Borrar(int id);
        Producto BuscaPorId(int id);
        List<Producto> BuscarTodos();
    }
}
