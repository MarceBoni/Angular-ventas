using System;
using System.Collections.Generic;

#nullable disable

namespace Ventas.Models
{
    public partial class Orden
    {
        public Orden()
        {
            DetalleOrdens = new HashSet<DetalleOrden>();
        }

        public int IdOrden { get; set; }
        public int IdCliente { get; set; }
        public int TotaItems { get; set; }
        public decimal ValorTotal { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual ICollection<DetalleOrden> DetalleOrdens { get; set; }
    }
}
