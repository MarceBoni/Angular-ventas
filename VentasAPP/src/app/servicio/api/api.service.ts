import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  urlApi:string ="http://localhost:36483/"
  constructor(private http:HttpClient, private router:Router) { }

  //cliente 
  getALLclientes():Observable<any[]>{
    let direccion = this.urlApi + "api/Clientes";
    return this.http.get<any[]>(direccion);
  }

  getSingleClientes(id:any):Observable<any>{
    let direccion = this.urlApi +"api/Clientes/"+ id;
    return this.http.get<any>(direccion)
  }

  putCliente(form:any):Observable<Response>{
    let direccion = this.urlApi+"api/Clientes/"+ form.idCliente;
    return this.http.put<Response>(direccion,form);
  }

  deleteCliente(form:any):Observable<Response>{
    let direccion = this.urlApi+"api/Clientes/"+ form.idCliente;
    let Options = {
      Headers: new HttpHeaders({
        'conten-type': 'applications/json'
      }),
      body:form
    }
    return this.http.delete<Response>(direccion,Options);
  }

  postCliente(form:any):Observable<any>{
    let direccion = this.urlApi+"api/Clientes";
    return this.http.post<any>(direccion,form);
  }
  //fin cliente
 // productos
 getALLProductos():Observable<any[]>{
  let direccion = this.urlApi + "api/Productos";
  return this.http.get<any[]>(direccion);
}

getSingleProductos(id:any):Observable<any>{
  let direccion = this.urlApi +"api/Productos/"+ id;
  return this.http.get<any>(direccion)
}

putProductos(form:any):Observable<Response>{
  let direccion = this.urlApi+"api/Productos/"+ form.idProducto;
  return this.http.put<Response>(direccion,form);
}

deleteProductos(form:any):Observable<Response>{
  let direccion = this.urlApi+"api/Productos/"+ form.idProducto;
  let Options = {
    Headers: new HttpHeaders({
      'conten-type': 'applications/json'
    }),
    body:form
  }
  return this.http.delete<Response>(direccion,Options);
}

postProductos(form:any):Observable<any>{
  let direccion = this.urlApi+"api/Productos";
  return this.http.post<any>(direccion,form);
}
 // fin producto



 
  getALLPedido():Observable<any[]>{
    let direccion = this.urlApi + "api/Ordenes";
    return this.http.get<any[]>(direccion);
  }
}
