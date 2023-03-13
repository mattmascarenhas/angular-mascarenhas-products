import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos/produtos';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = [];
  total: number = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }
  removeProdutoCarrinho(produtoId: number) {
    this.itensCarrinho = this.itensCarrinho.filter(
      (item) => item.id !== produtoId
    );
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calcularTotal();
  }
  calcularTotal() {
    this.total = this.itensCarrinho.reduce(
      (previous, current) => previous + current.preco * current.quantidade,
      0
    );
  }

  comprar() {
    alert('Parabéns, compra finalizada');
    this.carrinhoService.limparCarrinho();
    this.router.navigate(['produtos']);
  }
}
