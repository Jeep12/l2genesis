import { Component, OnInit } from '@angular/core';
import { ClientAccountService } from 'src/app/services/client-account.service';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.css']
})
export class MyAccountsComponent implements OnInit {
  accounts: any[] = [];        // Todas las cuentas
  filteredAccounts: any[] = []; // Cuentas filtradas
  pagedAccounts: any[] = [];    // Cuentas de la página actual
  errorMessage: string = '';
  searchTerm: string = '';      // Para la búsqueda

  // Variables para la paginación
  currentPage: number = 1;      // Página actual
  itemsPerPage: number = 8;     // Número de cuentas por página
  totalPages: number = 0;       // Total de páginas

  constructor(private clientAccountService: ClientAccountService) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  selectedAccount: any; // Para almacenar la cuenta seleccionada

  openModal(account: any) {
    this.selectedAccount = account;
  }

  getAccounts(): void {
    this.clientAccountService.getMyAccounts().subscribe(
      (data) => {
        this.accounts = data.map((account: { lastactive: string | number | Date; created_time: string | number | Date; }) => ({
          ...account,
          lastactive: account.lastactive && account.lastactive !== 0 
            ? new Date(account.lastactive) 
            : null, // Si es 0, asignamos null
          created_time: account.created_time && account.created_time !== 0 
            ? new Date(account.created_time) 
            : null // Si es 0, asignamos null
        }));
  
        // Ordenar las cuentas por la última actividad (más reciente primero)
        this.accounts.sort((a, b) => {
          const dateA = a.lastactive ? new Date(a.lastactive).getTime() : 0;
          const dateB = b.lastactive ? new Date(b.lastactive).getTime() : 0;
          return dateB - dateA; // Orden descendente
        });
  
        this.filteredAccounts = [...this.accounts]; // Inicializamos con todas las cuentas
        this.updatePagination(); // Configuramos la paginación
      },
      (error) => {
        this.errorMessage = 'Error al obtener las cuentas.';
        console.error(error);
      }
    );
  }
  

  // Método para filtrar las cuentas
  filterAccounts(): void {
    this.filteredAccounts = this.accounts.filter(account =>
      account.login.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reiniciamos a la primera página tras filtrar
    this.updatePagination();
  }

  // Método para actualizar la paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAccounts.length / this.itemsPerPage);
    this.pagedAccounts = this.filteredAccounts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  // Método para cambiar de página
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}





