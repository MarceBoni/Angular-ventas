import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/servicio/alertas/alertas.service';
import { ApiService } from 'src/app/servicio/api/api.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  show:boolean=false;
  create:boolean = true;
  cli:boolean = false;  
  datos: any;
  clientes!: any[];
  Form: FormGroup;
  nuevoForm:FormGroup;
  
  constructor(private Api:ApiService,private router:Router, private activeroute:ActivatedRoute,
    private alerta:AlertasService) { 
      this.Form = new FormGroup({
        idCliente: new FormControl(''),
        cedula: new FormControl('',Validators.required),
        nombre: new FormControl('',Validators.required),
        apellido: new FormControl('',Validators.required),
        telefono: new FormControl('',Validators.required)
      });
       this.nuevoForm =new FormGroup({
        cedula: new FormControl('',Validators.required),
        nombre: new FormControl('',Validators.required),
        apellido: new FormControl('',Validators.required),
        telefono: new FormControl('',Validators.required)
      });
    }

  ngOnInit(): void {
    this.Api.getALLclientes().subscribe( data=>{
      this.clientes = data;
      console.log('aqui',this.clientes );
    })
  }
  test=()=>{
    this.show=true;
    this.create=false;
  }
  Cancelar=()=>{
    this.create = true;
    this.show= false;
  }

  editarclientes=(id:any)=>{ 

        if (this.create =!false ){
        this.create = true;
        this.show= false;
         }
          this.cli = true;
          this.create = false; 
          let clienteId = id;
          this.Api.getSingleClientes(clienteId).subscribe(data=>{
              this.datos = data;
              console.log(this.datos, 'edi')
              this.Form.setValue({
                'idCliente': this.datos.idCliente,
                'cedula': this.datos.cedula,
                'nombre':this.datos.nombre,
                'apellido': this.datos.apellido,
                'telefono': this.datos.telefono
            })
      
    })    
  }

  PutFormEdit(form:any){
  
    this.Api.putCliente(form).subscribe(data =>{     
     if(data == null){
       this.alerta.ShowSuccess('Datos modificados','Hecho')
       this.ngOnInit();
       this.CancelarOut();
     } else 
          this.alerta.ShowError(data.statusText,'Error')

    })

    
  }

  PostFormCreate(form:any){
    console.log(form)
     this.Api.postCliente(form).subscribe(data =>{
    if(data.nombre != null){
      this.alerta.ShowSuccess('Datos Creados','Hecho')
      this.ngOnInit();
      this.Cancelar();
    } else 
         this.alerta.ShowError(data,'Error')
  })  
  }

  CancelarOut=()=>{
  this.cli = false;
  this.create = true;
  }
  eliminar(){
    let datos:any = this.Form.value;  
    this.Api.deleteCliente(datos).subscribe(data =>{
      let respuesta:Response = data;
      if(data == null){
        this.alerta.ShowSuccess('dato Eliminado','Hecho')
        this.ngOnInit();
        this.CancelarOut();
      } else 
      this.alerta.ShowError(data.statusText,'Error')
    })
  } 

}
