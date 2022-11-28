using System;
using System.Collections.Generic;

#nullable disable

namespace Ventas.Models
{
    public partial class Producto
    {
        public Producto()
        {
            DetalleOrdens = new HashSet<DetalleOrden>();
        }

        public int IdProducto { get; set; }
        public string Nombre { get; set; }
        public decimal ValorUnitario { get; set; }

        public virtual ICollection<DetalleOrden> DetalleOrdens { get; set; }
    }
}
