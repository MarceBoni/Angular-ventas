import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicio/api/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  clientes!: any[];
  nuevoForm: FormGroup;
  constructor(private Api:ApiService, private router: Router, private activeroute: ActivatedRoute, 
    public datepipe: DatePipe) { 
      this.nuevoForm = new FormGroup({
        idOrden: new FormControl('', Validators.required),
        idProducto: new FormControl('', Validators.required),
        nombreProducto : new FormControl('', Validators.required),
        valorUnitario: new FormControl('', Validators.required),
        cantidad: new FormControl('', Validators.required),
        valorTotal: new FormControl('', Validators.required),
  
      })
    }

  ngOnInit(): void {
    this.Api.getALLclientes().subscribe(dataClie =>{
      this.clientes = dataClie;  
      this.clientes.forEach((row: any) => {
        row.fullName=this.clientes.filter(item => item.idCliente == row.idCliente)[0].nombre + ' ' + this.clientes.filter(item => item.idCliente == row.idCliente)[0].apellido 
      })
    })
  }

}
