import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/servicio/alertas/alertas.service';
import { ApiService } from 'src/app/servicio/api/api.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  show:boolean=false;
  create:boolean = true;
  cli:boolean = false;  
  datos: any;
  Productos!: any[];
  Form: FormGroup;
  nuevoForm:FormGroup;
  constructor(private Api:ApiService,private router:Router, private activeroute:ActivatedRoute,
    private alerta:AlertasService) {
      this.Form = new FormGroup({
        idProducto: new FormControl(''),
        nombre: new FormControl('',Validators.required),
        valorUnitario: new FormControl('',Validators.required)
      });
       this.nuevoForm =new FormGroup({
        nombre: new FormControl('',Validators.required),
        valorUnitario: new FormControl('',Validators.required)
      });
     }

  ngOnInit(): void {
    this.Api.getALLProductos().subscribe( data=>{
      this.Productos = data;
      console.log('aqui',this.Productos );
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

  editarProductos=(id:any)=>{ 

        if (this.create =!false ){
        this.create = true;
        this.show= false;
         }
          this.cli = true;
          this.create = false; 
          let productoId = id;
          this.Api.getSingleProductos(productoId).subscribe(data=>{
              this.datos = data;
              console.log(this.datos, 'edi')
              this.Form.setValue({
                'idProducto': this.datos.idProducto,
                'nombre': this.datos.nombre,
                'valorUnitario':this.datos.valorUnitario
            })
      
    })    
  }

  PutFormEdit(form:any){
  
    this.Api.putProductos(form).subscribe(data =>{     
     if(data == null){
       this.alerta.ShowSuccess('Datos modificados','Hecho')
       this.ngOnInit();
       this.CancelarOut();
     } else 
          this.alerta.ShowError(data.statusText,'Error')

    })

    
  }

  PostFormCreate(form:any){   
     this.Api.postProductos(form).subscribe(data =>{
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
    this.Api.deleteProductos(datos).subscribe(data =>{
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
