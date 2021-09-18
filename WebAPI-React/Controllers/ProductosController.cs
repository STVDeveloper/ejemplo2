using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI_React.Servicios;
using WebAPI_React.Modelos;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private IRepositorio _repositorio;

        public ProductosController(IRepositorio repo)
        {
            _repositorio = repo;
        }

        // GET: api/<ProductosController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_repositorio.BuscarTodos().ToList());
            } catch (Exception ex)
            {
                return BadRequest("Error en peticion");
            }
        }

        // GET api/<ProductosController>/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                Producto prod = _repositorio.BuscaPorId(id);
                if (prod.Id == -1)
                {
                    return BadRequest("Producto con ID "+ id +" no existe.");
                } else
                {
                    return Ok(prod);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error en peticion");
            }
        }

        // POST api/<ProductosController>
        [HttpPost]
        public ActionResult Post([FromBody] Producto value)
        {
            try
            {
               _repositorio.Agregar(value);
                return Ok("Operacion exitosa");

            }
            catch (Exception ex)
            {
                return BadRequest("Error en peticion");
            }
        }

        // PUT api/<ProductosController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Producto value)
        {

            try
            {
                _repositorio.Actualizar(value);
                return Ok("Operacion exitosa");

            }
            catch (Exception ex)
            {
                return BadRequest("Error en peticion");
            }
        }

        // DELETE api/<ProductosController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _repositorio.Borrar(id);
                return Ok("Operacion exitosa");

            }
            catch (Exception ex)
            {
                return BadRequest("Error en peticion");
            }
        }
    }
}
