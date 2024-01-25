import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FuncionariosService } from 'src/app/funcionarios.service';
import { Funcionario } from 'src/app/models/funcionario';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  funcionarios: Funcionario[] = [];
  nomeFuncionario: string = '';
  funcionarioId: number = 0;

  visibilidadeTabela: boolean = true;

  visibilidadeFormulario: boolean = false;

  modalRef!: BsModalRef;


  constructor(private funcionarioService: FuncionariosService, private modalService: BsModalService){

  }

  ngOnInit(): void {
    this.funcionarioService.GetFuncionarios().subscribe(dados => {
      this.funcionarios = dados;
    });

  }

  ExibirFormulario(): void{
    this.visibilidadeTabela = false ;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo funcionário'
    this.formulario = new FormGroup({
      funcionarioId: new FormControl(0),
      nomeFuncionario: new FormControl(null),
      cargo: new FormControl(null),
      idadeFuncionario: new FormControl(null),
      ativo: new FormControl(true)
    });
  }

  ExibirFormularioAtualizacao(id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.funcionarioService.GetFuncionarioId(id).subscribe(dados => {
      this.tituloFormulario  = `Atualizar ${dados.nomeFuncionario}`;

      this.formulario = new FormGroup({
        funcionarioId: new FormControl(dados.funcionarioId),
        nomeFuncionario: new FormControl(dados.nomeFuncionario),
        cargo: new FormControl(dados.cargo),
        idadeFuncionario: new FormControl(dados.idadeFuncionario),
        ativo: new FormControl(dados.ativo)
      });
    });
  }


  EnviarFormulario(): void{
    const funcionario: Funcionario = this.formulario.value;

    if(funcionario.funcionarioId > 0 ){
      this.funcionarioService.PutFuncionario(funcionario).subscribe(dados =>{
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('O funcionário foi atualizado');

        this.funcionarioService.GetFuncionarios().subscribe(dados => {
          this.funcionarios = dados;
        });
      });
    } else {
      this.funcionarioService.PostFuncionario(funcionario).subscribe(dados => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('O funcionário foi cadastrado');

        this.funcionarioService.GetFuncionarios().subscribe(dados => {
          this.funcionarios = dados;
        });
      });
    }
  }

  ExibirConfirmacaoExclusao(funcionarioId: number, nomeFuncionario: string, conteudoModal: TemplateRef<any>): void  {
    this.modalRef = this.modalService.show(conteudoModal);
    this.funcionarioId = funcionarioId;
    this.nomeFuncionario = nomeFuncionario;
  }

  ExcluirFuncionario(id: number){
    this.funcionarioService.DeleteFuncionario(id).subscribe(dados => {
      this.modalRef.hide();
      alert('Pessoa excluída');
      this.funcionarioService.GetFuncionarios().subscribe(dadosFuncionarios => {
        this.funcionarios = dadosFuncionarios;

      })
    });
  }

  Voltar(): void{
    this.visibilidadeFormulario = false;
    this.visibilidadeTabela = true;
  }
}
