import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre: string;
  correo: string;
  password: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  formularioCreado: FormGroup;
  usuarios: Array<Usuario> = new Array<Usuario>();
  esNuevo: boolean=true;
  posicionEditar: number = -1;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group({
      nombre: ['Carmen',Validators.required],
      correo: ['',Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['',Validators.compose([
        Validators.required, Validators.minLength(8)
      ])]
    });
  }

  agregar(){
    // console.log(this.formularioCreado.value as Usuario);
    this.usuarios.push(this.formularioCreado.value as Usuario);
    this.formularioCreado.reset();
  }

  editar(){
    this.usuarios[this.posicionEditar].nombre=this.formularioCreado.value.nombre;
    this.usuarios[this.posicionEditar].correo=this.formularioCreado.value.correo;
    this.usuarios[this.posicionEditar].password=this.formularioCreado.value.password;
    this.formularioCreado.reset();
    this.esNuevo=true;
    this.posicionEditar=-1;
  }

  eliminarUsuario(posicion: number){
    this.usuarios.splice(posicion,1);
  }

  editarUsuario(posicion: number){
    
    this.formularioCreado.setValue({
      nombre: this.usuarios[posicion].nombre,
      correo: this.usuarios[posicion].correo,
      password: this.usuarios[posicion].password
    });
    this.posicionEditar=posicion;
    this.esNuevo=false;
  }
}
