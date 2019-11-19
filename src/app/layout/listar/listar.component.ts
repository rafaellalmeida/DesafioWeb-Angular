import { HttpServiceService } from './../../services/http-service.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface PeriodicElement {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}


@Component({
  selector: 'listar',
  styleUrls: ['./listar.component.scss'],
  templateUrl: './listar.component.html',
})
export class ListarComponent {
  displayedColumns: string[] = ['id', 'email', 'name', 'avatar', 'edit', 'action'];
  dataSource:PeriodicElement;
  length = 12;
  pageSize = 6;
  pageSizeOptions: number[] = [6];
  
  constructor(
    private http: HttpClient,
    private httpService: HttpServiceService
    ) { 
    this.listar(1).subscribe((data:PeriodicElement) => this.dataSource = data['data']);
   }
   public getServerData(e: any) {
    let page = e.pageIndex + 1;    
    this.listar(page).subscribe((data:PeriodicElement) => this.dataSource = data['data']);
  }
   listar(page:number){
     return  this.http.get<PeriodicElement>('https://reqres.in/api/users?page='+page);
   }

   deletar(id:number){
     var confirmacao = confirm('Deseja deletar esse usuário?');
     if(confirmacao){
      this.httpService.delete('https://reqres.in/api/users/' + id);
      alert('Deletado com Sucesso.');
     }
     return; 
   }

} 
