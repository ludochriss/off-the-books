import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SpotAsset } from 'src/app/models/spotAsset.model';
import { CryptoService } from 'src/app/services/cryptoService';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss'],
})
export class BalancesComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  spotAssets: SpotAsset[];
  spotAssetsDataSource: MatTableDataSource<SpotAsset> = new MatTableDataSource<SpotAsset>();
  accInfo: any;
  displayedColumns = ['asset', 'free', 'actions'];

  constructor(
    private cryptoService: CryptoService,
    private snackBar: MatSnackBar
  ) { }
  getAccountInfo() {
    this.cryptoService.$getAccountInfo().subscribe((data: any) => {
      this.accInfo = data;
      if (this.accInfo && Array.isArray(this.accInfo.responseData.balances)) {
        this.spotAssets = this.accInfo.responseData.balances
          .filter((balance: any) => balance.free > 0 || balance.locked > 0)
          .map((balance: any) => ({
            asset: balance.asset,
            free: parseFloat(balance.free),
            locked: parseFloat(balance.locked),
          }));
        this.spotAssetsDataSource = new MatTableDataSource<SpotAsset>(
          this.spotAssets
        );
        this.spotAssetsDataSource.paginator = this.paginator;
        console.log(this.spotAssetsDataSource);
        console.log(this.spotAssets);
      } else {
      }
    });
  }
  }
