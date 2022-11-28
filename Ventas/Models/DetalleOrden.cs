using System;
using System.Collections.Generic;

#nullable disable

namespace Ventas.Models
{
    public partial class DetalleOrden
    {
        public int IdDetalle { get; set; }
        public int IdOrden { get; set; }
        public int IdProducto { get; set; }
        public int NombreProducto { get; set; }
        public decimal ValorUnitario { get; set; }
        public int Cantidad { get; set; }
        public decimal ValorTotal { get; set; }

        public virtual Orden IdOrdenNavigation { get; set; }
        public virtual Producto IdProductoNavigation { get; set; }
    }
}
