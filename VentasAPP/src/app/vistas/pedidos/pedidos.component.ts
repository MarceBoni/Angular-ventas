import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicio/api/api.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  ordenes!: any[];
  dataClientes !:any[];
  constructor( private Api:ApiService, private router: Router, private activeroute: ActivatedRoute, 
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.Api.getALLPedido().subscribe(data=>{
      this.ordenes = data;
      console.log(this.ordenes)
      this.ordenes.forEach((row: any) => {
        row.fecha = this.datepipe.transform(row.fechaCreacion, 'YYYY-MM-dd')  
        this.Api.getALLclientes().subscribe(dataCliente => {
          this.dataClientes = dataCliente;
          row.nombre = this.dataClientes.filter(item => item.idCliente == row.idCliente)[0].nombre + ' ' + this.dataClientes.filter(item => item.idCliente == row.idCliente)[0].apellido 
        })
      })
    })
  }

  test=()=>{
    this.router.navigate(['create']);
  }
   
  editarOrdenes=(id: any)=>{
    this.router.navigate(['edit',id]);
  }
}
