using System;
using System.Collections.Generic;

#nullable disable

namespace Ventas.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Ordens = new HashSet<Orden>();
        }

        public int IdCliente { get; set; }
        public int Cedula { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Telefono { get; set; }

        public virtual ICollection<Orden> Ordens { get; set; }
    }
}
